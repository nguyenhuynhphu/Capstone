import { fetchManageBorrows, fetchReturnBook } from '@/services/manageborrow';
import { Effect, Reducer } from 'umi';

export interface ReturnBookTableState {
  data: any;
  pagination: any;
  filterName: string;
  isLoading: boolean;
}

export interface ReturnBookTableType {
  namespace: string;
  state: ReturnBookTableState;
  effects: {
    fetchData: Effect;
    onSelect: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
  };
}

const ReturnBookTableModel: ReturnBookTableType = {
  namespace: 'returnbooktable',
  state: {
    data: [],
    pagination: {
      current: 1,
      total: 0,
    },
    filterName: '',
    isLoading: false,
  },
  effects: {
    *fetchData({ payload }, { call, put }) {
      yield put({
        type: 'isLoading',
        payload: {},
      });
      const response = yield call(fetchReturnBook, payload);
      yield put({
        type: 'loadData',
        payload: { response: response, filter: payload },
      });
    },

    *onSelect({ payload }, { call, put }) {
      yield put({
        type: 'loadData',
        payload: { payload },
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
      const { response, filter } = payload;

      if (filter != undefined) {
        response.data.forEach((returnReq: any) => {
          returnReq.key = returnReq.id;
        });
        return {
          ...state,
          filterName: filter.filterName,
          data: response.data,
          pagination: {
            current: filter.pagination,
            total: response.meta.totalCount,
          },
          isLoading: false,
        };
      } else {
        return {
          ...state,
        };
      }
    },
  },
};

export default ReturnBookTableModel;
