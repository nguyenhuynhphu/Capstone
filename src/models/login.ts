import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';

import { login } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { deleteAllCookie, getPageQuery, removeLocalStorage, setCookie } from '@/utils/utils';
import { decodeToken } from '@/utils/jwtservice';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      if (response.token !== undefined) {
        setCookie('APP_TOKEN', response.token);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();

        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace('/');
      }
    },

    *logout(_, { call, put }) {
      deleteAllCookie();
      // document.cookie.
      removeLocalStorage('SYSTEM_ROLE');
      // clear localStorage
      yield put({ type: 'user/saveCurrentUser', payload: null });
      // remove currentUser
      const { redirect } = getPageQuery();

      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.token != undefined) {
        let user: any = decodeToken(payload.token);
        if (user.roleId == 1) setAuthority('admin');
        else setAuthority('user');

        user.role = user.roleId;
      }
      return {
        ...state,
        status: payload.token != undefined ? 'ok' : 'error',
        type: payload.type,
      };
    },
  },
};

export default Model;
