import { fetchManageBorrows } from '@/services/manageborrow';
import { Effect, Reducer } from 'umi';

export interface ManageBorrowTableState {
  data: any;
  pagination: any;
  filterName: string;
  isLoading: boolean;
  selectedRowKeys: any;
}

export interface ManageBorrowTableType {
  namespace: string;
  state: ManageBorrowTableState;
  effects: {
    fetchData: Effect;
    onSelect: Effect;
  };
  reducers: {
    isLoading: Reducer<ManageBorrowTableState>;
    loadData: Reducer<ManageBorrowTableState>;
    selected: Reducer<ManageBorrowTableState>;
  };
}

const ManageBorrowTableModel: ManageBorrowTableType = {
  namespace: 'manageborrowtable',
  state: {
    data: [],
    pagination: {
      current: 1,
      total: 0,
      showSizeChanger: false
    },
    filterName: '',
    isLoading: false,
    selectedRowKeys: []
  },
  effects: {
    *fetchData({ payload }, { call, put }) {
      yield put({
        type: 'isLoading',
        payload: {},
      });
      const response = yield call(fetchManageBorrows, payload);
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
    isLoading(state, { }) {
      return {
        ...state,
        isLoading: true,
      };
    },
    loadData(state, { payload }) {
      const { response, filter } = payload;
      
      if (filter != undefined) {
        response.data.forEach((bookGroup: any)=> {
          bookGroup.key = bookGroup.id;
        });
        return {
          ...state,
          filterName: filter.filterName,
          data: response.data,
          pagination: {
            current: filter.pagination,
            total: response.meta.totalCount,
            showSizeChanger: false
          },
          isLoading: false,
        };
      } else {
        return {
          ...state,
        };
      }
    },
    selected(state, { payload }) {
      return {
        ...state,
        selectedRowKeys: payload,
      };
    },
  },
};

export default ManageBorrowTableModel;
