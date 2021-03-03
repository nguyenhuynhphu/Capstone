import { Effect, ManageBookState, Reducer } from 'umi';

export interface ManageBorrowState {
  isMakingTransaction: boolean;
  screenLoading: boolean;

  processStep: number;
}

export interface ManageBorrowType {
  namespace: string;
  state: ManageBorrowState;
  effects: {
    changeScreen: Effect;
    changeProcess: Effect;
  };
  reducers: {
    renderScreen: Reducer;
    renderStep: Reducer;

    loading: Reducer;
  };
}

const ManageBorrowModel: ManageBorrowType = {
  namespace: 'manageborrow',
  state: {
    isMakingTransaction: false,
    screenLoading: false,
    processStep: 1,
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
  },
  reducers: {
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

    renderScreen(state, { payload }) {
      return {
        ...state,
        isMakingTransaction: !state.isMakingTransaction,
        screenLoading: false,
      };
    },
  },
};

export default ManageBorrowModel;
