import { fetchBorrowDetail, fetchReturn, fetchReturnDetail } from '@/services/manageborrow';
import { Effect, Reducer } from 'umi';

export interface ManageBorrowPageState {
  viewBorrowVisible: boolean;
  choiceBorrow: any;
  borrowDetail: any;
  borrowLoading: boolean;

  viewReturnVisible: boolean;
  choiceReturn: any;
}

export interface ManageBorrowPageType {
  namespace: string;
  state: ManageBorrowPageState;
  effects: {
    showViewBorrow: Effect;
    hideViewBorrow: Effect;

    showViewReturn: Effect;
    hideViewReturn: Effect;
  };
  reducers: {
    borrowLoading: Reducer;
    displayScrollBar: Reducer;
    displayViewBorrow: Reducer;

    displayViewReturn: Reducer;
  };
}

const ManageBorrowPageModel: ManageBorrowPageType = {
  namespace: 'manageborrowpage',
  state: {
    viewBorrowVisible: false,
    choiceBorrow: {},
    borrowDetail: {},
    borrowLoading: false,

    viewReturnVisible: false,
    choiceReturn: {}
  },
  effects: {
    //===================================
    *showViewBorrow({ payload }, { put, call }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield put({
        type: 'borrowLoading',
        payload: true,
      });
      yield put({
        type: 'displayViewBorrow',
        payload: {visible: true, record: {}},
      });
      const data = yield call(fetchBorrowDetail, payload.id)
      var tmp = data.data;
      for (let i = 0; i < tmp.length; i++) {
        const borrowDetail = tmp[i];   
        if(borrowDetail.isReturn){
          const response = yield call(fetchReturn, borrowDetail.bookId);
          borrowDetail.returnId = response.data[0].returnId;
          borrowDetail.returnTime = response.data[0].returnTime;
        }
      }
      payload.borrowDetail = data.data;
      yield put({
        type: 'displayViewBorrow',
        payload: {visible: true, record: payload},
      });
      yield put({
        type: 'borrowLoading',
        payload: false,
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
    },
    *showViewReturn({ payload }, { put, call }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      const data = yield call(fetchReturnDetail, payload.id)
      
     
      payload.borrowDetail = data.data;
      yield put({
        type: 'displayViewReturn',
        payload: {visible: true, record: payload},
      });
    },
    *hideViewReturn(_, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
      yield put({
        type: 'displayViewReturn',
        payload: {visible: false, record: {}},
      });
    }
  },
  reducers: {
    borrowLoading(state, {payload}) {
      return {
        ...state,
        borrowLoading: payload
      }
    },
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
        choiceBorrow: record,
      };
    },
    displayViewReturn(state, {payload}) {
      const {visible, record} = payload;
      return {
        ...state,
        viewReturnVisible: visible,
        choiceReturn: record
      };
    },
  },
};

export default ManageBorrowPageModel;
