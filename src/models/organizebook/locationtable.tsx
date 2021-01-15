import { fetchAllBookGroup } from '@/services/bookgroup';
import { fetchLocation } from '@/services/organizebook';
import { Effect, Reducer } from 'umi';

export interface LocationTableState {
  data: any;
  pagination: any;
  filterName: string;
  isLoading: boolean;
  selectedRowKeys: any;
  
}

export interface LocationTableType {
  namespace: string;
  state: LocationTableState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer<LocationTableState>;
    loadData: Reducer<LocationTableState>;
  };
}

const LocationTableModel: LocationTableType = {
  namespace: 'locationtable',
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

      const response = yield call(fetchLocation, payload);
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
        response.data.forEach((location: any) => {
          location.key = location.id;
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

export default LocationTableModel;
