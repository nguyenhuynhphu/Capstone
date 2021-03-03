import { Effect, Reducer } from 'umi';

export interface ManageBorrowPageState {
  viewBorrowVisible: boolean;
  choiceBorrow: any;
}

export interface ManageBorrowPageType {
  namespace: string;
  state: ManageBorrowPageState;
  effects: {
    showViewBorrow: Effect;
    hideViewBorrow: Effect;
  };
  reducers: {
    displayScrollBar: Reducer<ManageBorrowPageState>;
    displayViewBorrow: Reducer<ManageBorrowPageState>;
  };
}

const ManageBorrowPageModel: ManageBorrowPageType = {
  namespace: 'manageborrowpage',
  state: {
    viewBorrowVisible: false,
    choiceBorrow: {},
  },
  effects: {
    //===================================
    *showViewBorrow({ payload }, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield put({
        type: 'displayViewBorrow',
        payload: {visible: true, record: payload},
      });
    },
    *hideViewBorrow(_, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
      yield put({
        type: 'displayViewBorrow',
        payload: {visible: false, record: {}},
      });
      
    }
  },
  reducers: {
    displayScrollBar(state, { payload }) {
      if (payload) {
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
        document.getElementsByTagName('body')[0].style.paddingRight = '0px';
      } else {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        document.getElementsByTagName('body')[0].style.paddingRight = '17px';
      }
      return {
        ...state,
      };
    },
    displayViewBorrow(state, {payload}) {
      const {visible, record} = payload;
      return {
        ...state,
        viewBorrowVisible: visible,
        choiceBorrow: record
      };
    },
  },
};

export default ManageBorrowPageModel;
