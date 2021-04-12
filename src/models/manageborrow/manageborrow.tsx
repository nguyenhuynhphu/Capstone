import { confirmBorrow, fetchBorrowBook, fetchCustomer } from '@/services/manageborrow';
import _ from 'lodash';
import { Effect, ManageBookState, Reducer } from 'umi';

export interface ManageBorrowState {
  isMakingTransaction: boolean;
  isMakingReturn: boolean;

  isConnect: boolean;
  screenLoading: boolean;

  processStep: number;

  scanId: any;
  wishlist: any;
  customer: any;
  borrowDetail: any;

  returnList: any;
}

export interface ManageBorrowType {
  namespace: string;
  state: ManageBorrowState;
  effects: {
    changeScreen: Effect;
    changeProcess: Effect;

    fetchCustomer: Effect;
    loadWishlist: Effect;

    fetchBorrowDetail: Effect;

    confirmBorrow: Effect;
  };
  reducers: {
    renderScreen: Reducer;
    renderStep: Reducer;
    renderButton: Reducer;
    renderWishList: Reducer;
    resetState: Reducer;
    loadCustomer: Reducer;
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
    customer: {},
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
    *fetchCustomer({ payload }, { call, put }) {
      const response = yield call(fetchCustomer, payload);
      yield put({
        type: 'loadCustomer',
        payload: response.data,
      });
    },
    *confirmBorrow({ payload }, { call, put }) {
      yield call(confirmBorrow, payload);
    },
    *fetchBorrowDetail({ payload }, { call, put }) {
      const response = yield call(fetchBorrowBook, payload.data[0].borrowId);
      const customer = yield call(fetchCustomer, response.data.customerId);
      response.data.customer = customer.data;
      response.data.borrowDetail = payload.data;
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
        isMakingReturn: false,
        isConnect: false,
        screenLoading: false,
        processStep: 0,
        wishlist: {},
        customer: {},
        scanId: [],
        returnList: [],
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
            payloadRemoveList.push(book);
          } else {
            scanIdRemoveList.push(tmp);
          }
        }
      });
      _.pullAll(payload, payloadRemoveList);
      _.pullAll(state.scanId, scanIdRemoveList);

      return {
        ...state,
        scanId: _.concat(state.scanId, payload),
      };
    },
    addToReturnBorrow(state, { payload }) {
      var tmp = state.borrowDetail.borrowDetail.find((x: any) => x.barcode == payload);
      tmp.isReturn = true
      return {
        ...state,
        borrowDetail: state.borrowDetail
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
    loadCustomer(state, { payload }) {
      return {
        ...state,
        customer: payload,
      };
    },
    loadBorrowDetail(state, { payload }) {
      return {
        ...state,
        borrowDetail: payload
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
        customer: {},
      };
    },
  },
};

export default ManageBorrowModel;
