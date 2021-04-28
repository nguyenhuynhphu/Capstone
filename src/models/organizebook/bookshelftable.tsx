
import { fetchBookShelf } from '@/services/organizebook';
import { Effect, Reducer } from 'umi';

export interface BookShelfTableState {
  data: any;
  pagination: any;
  filterName: string;
  isLoading: boolean;
//   selectedRowKeys: any;
  
}

export interface BookShelfTableType {
  namespace: string;
  state: BookShelfTableState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
  };
}

const BookShelfTableModel: BookShelfTableType = {
  namespace: 'bookshelftable',
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
      yield call(() => {}, payload);
      yield put({
        type: 'isLoading',
        payload: {},
      });

      const response = yield call(fetchBookShelf, payload);
      yield put({
        type: 'loadData',
        payload: { response: response, filter: payload },
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
        response.data.forEach((bookshelf: any) => {
          bookshelf.key = bookshelf.id;
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

export default BookShelfTableModel;
