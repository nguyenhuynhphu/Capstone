import { addBookToDrawer, fetchBookInSystem, removeBooksFromDrawer } from '@/services/organizebook';
import moment from 'moment';
import { Effect, Reducer } from 'umi';

export interface TransferBookState {
  allBooksVisible: string;

  bookData: [];
  paginationBook: any;
  filterNameBook: string;
  isLoading: boolean;

  bookInDrawer: [];
  paginationDrawer: any;
  filterNameBookDrawer: string;
  isLoadingDrawer: boolean;

  selectedBooks: any;
  selectedBooksDrawer: any;
}

export interface TransferBookType {
  namespace: string;
  state: TransferBookState;
  effects: {
    showAllBooks: Effect;
    hideAllBooks: Effect;

    fetchData: Effect;
    fetchBooksInDrawer: Effect;
    changeLoadingState: Effect;
    selectedBooks: Effect;
    selectedBooksDrawer: Effect;
    cleanData: Effect;

    insertBookToDrawer: Effect;
    removeBookToDrawer: Effect;
  };
  reducers: {
    displayAllBooks: Reducer;

    isLoading: Reducer;
    loadData: Reducer;
    loadDataDrawer: Reducer;

    loadSeletedBook: Reducer;
    loadSeletedBookDrawer: Reducer;
    refreshData: Reducer;
  };
}

const TransferModel: TransferBookType = {
  namespace: 'transferbook',
  state: {
    isLoading: false,
    isLoadingDrawer: false,
    allBooksVisible: '0px',
    paginationDrawer: {
      current: 1,
      pageSize: 20,
      showSizeChanger: false,
      position: ['bottomLeft'],
      size: 'small',
      total: 0,
    },
    paginationBook: {
      current: 1,
      pageSize: 20,
      showSizeChanger: false,
      position: ['bottomLeft'],
      size: 'small',
      total: 0,
    },
    filterNameBookDrawer: '',
    filterNameBook: '',

    bookData: [],
    bookInDrawer: [],

    selectedBooks: [],
    selectedBooksDrawer: [],
  },
  effects: {
    *changeLoadingState(_, { put }) {
      yield put({
        type: 'isLoading',
        payload: {},
      });
      yield put({
        type: 'isLoadingDrawer',
        payload: {},
      });
    },

    *fetchData({ payload }, { call, put }) {
      yield put({
        type: 'isLoading',
        payload: {},
      });
  
      var response = yield call(fetchBookInSystem, payload);

      yield put({
        type: 'loadData',
        payload: { response: response, filter: payload },
      });
    },

    *fetchBooksInDrawer({ payload }, { call, put }) {
      yield put({
        type: 'isLoadingDrawer',
        payload: {},
      });
      const response = yield call(fetchBookInSystem, payload);
      response.data = response.data.filter((drawer: any) => drawer.isDeleted == false)
      yield put({
        type: 'loadDataDrawer',
        payload: { response: response, filter: payload },
      });
    },

    *selectedBooks({ payload }, { put }) {
      yield put({
        type: 'loadSeletedBook',
        payload: payload,
      });
    },
    *selectedBooksDrawer({ payload }, { put }) {
      yield put({
        type: 'loadSeletedBookDrawer',
        payload: payload,
      });
    },

    *cleanData({ payload }, { put }) {
      yield put({
        type: 'refreshData',
        payload: payload,
      });
    },

    *insertBookToDrawer({ payload }, { call }) {
      let arrayLength = payload.data;
      let tmp: any = [];

      arrayLength.forEach((ele: any) => {
        tmp.push({
          id: ele,
          drawerId: payload.drawerId,
        });
      });

      yield call(addBookToDrawer, tmp);
    },

    *removeBookToDrawer({ payload }, { call }) {
      let arrayLength = payload.data;
      let tmp: any = [];
 
      arrayLength.forEach((ele: any) => {
        tmp.push({
          id: ele,
          drawerId: null,
        });
      });

      yield call(removeBooksFromDrawer, tmp);
    },

    *showAllBooks({ payload }, { call, put }) {
      yield put({
        type: 'displayAllBooks',
        payload: 'calc(-100% - 2px)',
      });
    },
    *hideAllBooks({ payload }, { call, put }) {
      yield put({
        type: 'displayAllBooks',
        payload: '0px',
      });
    },
  },
  reducers: {
    isLoading(state: any, {}: any) {
      return {
        ...state,
        isLoading: true,
      };
    },

    displayAllBooks(state: any, { payload }: any) {
      return {
        ...state,
        allBooksVisible: payload,
      };
    },

    loadData(state: any, { payload }: any) {
      const { response, filter } = payload;
      response.data.forEach((bookInSystem: any) => {
        bookInSystem.key = bookInSystem.id;
      });
      return {
        ...state,
        bookData: response.data,
        paginationBook: {
          current: filter.pagination,
          total: response.meta.totalCount,
          position: ['bottomLeft'],
          pageSize: 20,
          showSizeChanger: false,
          size: 'small',
        },
        filterNameBook: filter.filterName,
        isLoading: false,
        selectedBooks: [],
      };
    },
    loadDataDrawer(state: any, { payload }: any) {
      const { response, filter } = payload;
      response.data.forEach((bookInDrawer: any) => {
        bookInDrawer.key = bookInDrawer.id;
      });
      return {
        ...state,
        bookInDrawer: response.data,
        paginationDrawer: {
          current: filter.pagination,
          total: response.meta.totalCount,
          position: ['bottomLeft'],
          pageSize: 20,
          showSizeChanger: false,
          size: 'small',
        },
        filterNameBookDrawer: filter.filterName,
        isLoadingDrawer: false,
        selectedBooksDrawer: [],
      };
    },
    loadSeletedBook(state: any, { payload }: any) {
      return {
        ...state,
        selectedBooks: payload,
      };
    },
    loadSeletedBookDrawer(state: any, { payload }: any) {
      return {
        ...state,
        selectedBooksDrawer: payload,
      };
    },
    refreshData(state: any, {}: any) {
      return {
        ...state,
        filterNameBookDrawer: '',
        bookInDrawer: [],
        selectedBooks: [],
        selectedBooksDrawer: [],
        paginationDrawer: {
          current: 1,
          pageSize: 20,
          showSizeChanger: false,
          position: ['bottomLeft'],
          size: 'small',
          total: 0,
        },
      };
    },
  },
};

export default TransferModel;
