import { fetchAllBookGroup } from '@/services/bookgroup';
import { fetchLibarians } from '@/services/libarian';
import { Effect, Reducer } from 'umi';

export interface LibarianTableState {
  data: any;
  pagination: any;
  filterName: string;
  isLoading: boolean;
  selectedRowKeys: any;
}

export interface LibarianTableType {
  namespace: string;
  state: LibarianTableState;
  effects: {
    fetchData: Effect;
    onSelect: Effect;
  };
  reducers: {
    isLoading: Reducer<LibarianTableState>;
    loadData: Reducer<LibarianTableState>;
    selected: Reducer<LibarianTableState>;
  };
}

const LibarianTableModel: LibarianTableType = {
  namespace: 'libariantable',
  state: {
    data: [],
    pagination: {
      current: 1,
      total: 0,
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
      const response = yield call(fetchLibarians, payload);
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

export default LibarianTableModel;
