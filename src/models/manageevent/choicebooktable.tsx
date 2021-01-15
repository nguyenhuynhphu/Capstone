import { fetchAllBookGroup } from '@/services/bookgroup';
import { Effect, Reducer } from 'umi';

export interface ChoiceBookTableState {
  data: any;
  pagination: any;
  filterName: string;
  isLoading: boolean;
  selectedRowKeys: any;
}

export interface ChoiceBookTableType {
  namespace: string;
  state: ChoiceBookTableState;
  effects: {
    fetchData: Effect;
    onSelect: Effect;
  };
  reducers: {
    isLoading: Reducer<ChoiceBookTableState>;
    loadData: Reducer<ChoiceBookTableState>;
    selected: Reducer<ChoiceBookTableState>;
  };
}

const BookGroupTableModel: ChoiceBookTableType = {
  namespace: 'choicebooktable',
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
      yield call(() => {}, payload);
      yield put({
        type: 'isLoading',
        payload: {},
      });

      const response = yield call(fetchAllBookGroup, payload);
      yield put({
        type: 'loadData',
        payload: { response: response, filter: payload },
      });
    },

    *onSelect({ payload }, { call, put }) {

      yield call(() => {});
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

export default BookGroupTableModel;
