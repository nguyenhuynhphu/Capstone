
import { NoticeIconData } from '@/components/NoticeIcon';
import { Effect, Reducer } from 'umi';


export interface GlobalModelState {
  colors: any;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    getColors: Effect
  };
  reducers: {
    loadColors: Reducer<GlobalModelState>;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    colors: [
      'pink',
      'red',
      'yellow',
      'orange',
      'cyan',
      'green',
      'blue',
      'purple',
      'geekblue',
      'magenta',
      'volcano',
      'gold',
      'lime',
    ],
  },

  effects: {
    *getColors(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'loadColors',
        payload: {},
      });
    },
  },

  reducers: {
    loadColors(state, { payload }) {
      return {
        ...state,
      };
    },

  },
};

export default GlobalModel;
