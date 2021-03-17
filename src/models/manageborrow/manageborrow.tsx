import { confirmBorrow, fetchCustomer } from '@/services/manageborrow';
import { Effect, ManageBookState, Reducer } from 'umi';

export interface ManageBorrowState {
  isMakingTransaction: boolean;
  isMakingReturn: boolean;

  isConnect: boolean;
  screenLoading: boolean;

  processStep: number;

  wishlist: any;
  customer: any;
}

export interface ManageBorrowType {
  namespace: string;
  state: ManageBorrowState;
  effects: {
    changeScreen: Effect;
    changeProcess: Effect;

    fetchCustomer: Effect;
    loadWishlist: Effect;

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
  },
  reducers: {
    resetState(state) {
      return {
        isMakingTransaction: false,
        isMakingReturn: false,
        isConnect: false,
        screenLoading: false,
        processStep: 0,
        wishlist: {},
        customer: {},
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
