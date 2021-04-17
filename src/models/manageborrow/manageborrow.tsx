import {
  confirmBorrow,
  confirmReturn,
  fetchBorrowBook,
  fetchPatron,
} from '@/services/manageborrow';
import _ from 'lodash';
import { Effect, Reducer } from 'umi';

export interface ManageBorrowState {
  isMakingTransaction: boolean;
  isMakingReturn: boolean;

  isConnect: boolean;
  screenLoading: boolean;

  processStep: number;

  scanId: any;
  wishlist: any;
  patron: any;
  borrowDetail: any;

  returnList: any;
}

export interface ManageBorrowType {
  namespace: string;
  state: ManageBorrowState;
  effects: {
    changeScreen: Effect;
    changeProcess: Effect;

    fetchPatron: Effect;
    loadWishlist: Effect;

    fetchBorrowDetail: Effect;

    confirmBorrow: Effect;
    confirmReturn: Effect;
  };
  reducers: {
    renderScreen: Reducer;
    renderStep: Reducer;
    renderButton: Reducer;
    renderWishList: Reducer;
    resetState: Reducer;
    loadPatron: Reducer;
    renderReturnScreen: Reducer;
    loading: Reducer;

    addToScanId: Reducer;
    removeFromScanId: Reducer;

    addToReturnBorrow: Reducer;
    //removeFromScanId: Reducer;

    loadBorrowDetail: Reducer;
    anotherBorrowRequest: Reducer;
  };
}

const ManageBorrowModel: ManageBorrowType = {
  namespace: 'manageborrow',
  state: {
    isMakingTransaction: false,
    isConnect: false,
    screenLoading: false,
    isMakingReturn: false,
    processStep: 0,
    wishlist: {},
    patron: {},
    borrowDetail: {},
    scanId: [],
    returnList: {},
  },
  effects: {
    *changeScreen({ payload }, { call, put }) {
      yield put({
        type: 'renderScreen',
        payload: {},
      });
    },
    *changeProcess({ payload }, { call, put }) {
      yield put({
        type: 'renderStep',
        payload: payload,
      });
    },
    *loadWishlist({ payload }, { call, put }) {
      yield put({
        type: 'loadWishlist',
        payload: payload,
      });
    },
    *fetchPatron({ payload }, { call, put }) {
      const response = yield call(fetchPatron, payload);
      yield put({
        type: 'loadPatron',
        payload: response.data,
      });
    },
    *confirmBorrow({ payload }, { call, put }) {
      yield call(confirmBorrow, payload);
    },
    *confirmReturn({ payload }, { call, put }) {
      yield call(confirmReturn, payload);
    },
    *fetchBorrowDetail({ payload }, { call, put }) {
      const response = yield call(fetchBorrowBook, payload.data[0].borrowId);
      const patron = yield call(fetchPatron, response.data.patronId);

      response.data.patron = patron.data;
      response.data.borrowDetail = payload.data;
      response.endTime = payload.data[0].endTime;
      yield put({
        type: 'loadBorrowDetail',
        payload: response.data,
      });
    },
  },
  reducers: {
    resetState(state) {
      return {
        ...state,
        isMakingTransaction: false,
        isConnect: false,
        screenLoading: false,
        isMakingReturn: false,
        processStep: 0,
        wishlist: {},
        patron: {},
        borrowDetail: {},
        scanId: [],
        returnList: {},
      };
    },
    loading(state) {
      return {
        ...state,
        screenLoading: true,
      };
    },
    renderStep(state, { payload }) {
      return {
        ...state,
        processStep: payload,
      };
    },
    addToScanId(state, { payload }) {
      var tmp;
      var payloadRemoveList: any = [];
      var scanIdRemoveList: any = [];

      payload.forEach((book: any) => {
        tmp = state.scanId?.find((x: any) => x.id == book.id);
        if (tmp != undefined) {
          if (tmp.selectedBook != undefined) {
            tmp.selectedBook = book.selectedBook;
            payloadRemoveList.push(book);
          } else {
            if (tmp.drawer.length != 0) {
              book.drawer = tmp.drawer;
            }
            scanIdRemoveList.push(tmp);
          }
        }
      });
      _.pullAll(payload, payloadRemoveList);
      _.pullAll(state.scanId, scanIdRemoveList);
      console.log('payload', payload);
      console.log('state.scanId', state.scanId);
      return {
        ...state,
        scanId: _.concat(state.scanId, payload),
      };
    },
    addToReturnBorrow(state, { payload }) {
      var tmp = state.borrowDetail.borrowDetail.find((x: any) => x.barcode == payload);
      if (tmp != undefined) tmp.isReturn = true;
      return {
        ...state,
        borrowDetail: state.borrowDetail,
      };
    },
    removeFromScanId(state, { payload }) {
      _.pull(state.scanId, payload);

      return {
        ...state,
      };
    },
    renderWishList(state, { payload }) {
      return {
        ...state,
        wishlist: payload,
      };
    },
    renderScreen(state, { payload }) {
      return {
        ...state,
        isMakingTransaction: !state.isMakingTransaction,
        isMakingReturn: false,
        screenLoading: false,
      };
    },
    renderReturnScreen(state, { payload }) {
      return {
        ...state,
        isMakingReturn: !state.isMakingReturn,
        isMakingTransaction: false,
        screenLoading: false,
      };
    },
    renderButton(state, { payload }) {
      return {
        ...state,
        isConnect: payload,
      };
    },
    loadPatron(state, { payload }) {
      return {
        ...state,
        patron: payload,
      };
    },
    loadBorrowDetail(state, { payload }) {
      return {
        ...state,
        borrowDetail: payload,
      };
    },

    anotherBorrowRequest(state, { payload }) {
      return {
        ...state,
        isMakingTransaction: true,
        isMakingReturn: false,
        isConnect: false,
        screenLoading: false,
        processStep: 0,
        wishlist: {},
        patron: {},
      };
    },
  },
};

export default ManageBorrowModel;
