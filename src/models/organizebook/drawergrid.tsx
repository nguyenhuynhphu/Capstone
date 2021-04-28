import { fetchBookShelf, fetchDrawer } from '@/services/organizebook';

import { Effect, Reducer } from 'umi';

export interface DrawerGridState {
  data: [];
  isLoading: boolean;
  selectDrawer: any;
  drawerInfoVisible: boolean;
}

export interface DrawerGridType {
  namespace: string;
  state: DrawerGridState;
  effects: {
    fetchData: Effect;
    onSelectDrawer: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
    loadDrawer: Reducer;
    hideDrawer: Reducer;
  };
}

const DrawerGridModel: DrawerGridType = {
  namespace: 'drawergrid',
  state: {
    selectDrawer: {},
    isLoading: false,
    data: [],
    drawerInfoVisible: false,
  },
  effects: {
    *fetchData({ payload }, { call, put }) {
      yield put({
        type: 'isLoading',
        payload: {},
      });
      const response = yield call(fetchDrawer, payload);
     
      yield put({
        type: 'loadData',
        payload: { response: response },
      });
    },
    *onSelectDrawer({ payload }, { call, put }) {
      yield put({
        type: 'loadDrawer',
        payload: payload,
      });
    },
  },
  reducers: {
    isLoading(state, {}) {
      return {
        ...state,
        isLoading: true,
      };
    },
    loadData(state, { payload }) {
      const { response } = payload;

      response.forEach((drawer: any) => {
        drawer.key = drawer.id;
      });
      return {
        data: response,
        isLoading: false,
      };
    },

    loadDrawer(state, { payload }) {
      return {
        ...state,
        drawerInfoVisible: true,
        selectDrawer: payload,
      };
    },

    hideDrawer(state, { payload }) {
      return {
        ...state,
        drawerInfoVisible: false,
        selectDrawer: payload,
      };
    },
  },
};

export default DrawerGridModel;
