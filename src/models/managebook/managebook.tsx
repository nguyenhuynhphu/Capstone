import { deleteBookGroup, fetchCategories, insertBookGroup } from '@/services/bookgroup';
import { Effect, Reducer } from 'umi';

export interface ManageBookState {
  viewBookVisible: boolean;
  createBookVisible: boolean;
  editBookVisible: boolean;
  deleteBookVisible: boolean;

  categories: any;
  choiceBook: any;
}

export interface ManageBookType {
  namespace: string;
  state: ManageBookState;
  effects: {
    //#region Forms
    showViewBook: Effect;
    hideViewBook: Effect;

    showCreateBook: Effect;
    hideCreateBook: Effect;

    showEditBook: Effect;
    hideEditBook: Effect;

    showDeleteBook: Effect;
    hideDeleteBook: Effect;
    //#endregion
    insertBookGroup: Effect;
    deleteBookGroup: Effect;
    fetchCategories: Effect;
  };
  reducers: {
    //#region Forms
    displayViewBook: Reducer<ManageBookState>;
    displayCreateBook: Reducer<ManageBookState>;
    displayEditBook: Reducer<ManageBookState>;
    displayDeleteBook: Reducer<ManageBookState>;

    loadCategories: Reducer<ManageBookState>;

    displayScrollBar: Reducer<ManageBookState>;
    //#endregion
  };
}

const ManageBookModel: ManageBookType = {
  namespace: 'managebook',
  state: {
    viewBookVisible: false,
    createBookVisible: false,
    editBookVisible: false,
    deleteBookVisible: false,
    choiceBook: {},
    categories: [],
  },
  effects: {
    //#region Forms
    *showViewBook({ payload }, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield call(() => {});
      yield put({
        type: 'displayViewBook',
        payload: { visible: true, record: payload },
      });
    },
    *hideViewBook(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
      yield call(() => {});
      yield put({
        type: 'displayViewBook',
        payload: { visible: false, record: undefined },
      });
    },
    *showCreateBook(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield call(() => {});
      yield put({
        type: 'displayCreateBook',
        payload: true,
      });
    },
    *hideCreateBook(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
      yield call(() => {});
      yield put({
        type: 'displayCreateBook',
        payload: false,
      });
    },
    *showEditBook({ payload }, { call, put }) {
      yield call(() => {});

      yield put({
        type: 'displayEditBook',
        payload: { visible: true, record: payload },
      });
    },
    *hideEditBook(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayEditBook',
        payload: { visible: false, record: undefined },
      });
    },

    *showDeleteBook({ payload }, { call, put }) {
      yield call(() => {});

      yield put({
        type: 'displayDeleteBook',
        payload: true,
      });
    },
    *hideDeleteBook(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayDeleteBook',
        payload: false,
      });
    },

    //#endregion
    *insertBookGroup({ payload }, { call, put }) {
      var tmp = payload.category;

      payload.bookCategory = [];
      tmp.forEach((cate: any) => {
        payload.bookCategory.push({categoryId: cate})
      });

      delete payload.category;
      yield call(insertBookGroup, payload);
      yield put({
        type: 'displayCreateBook',
        payload: false,
      });
    },

    *deleteBookGroup({ payload }, { call, put }) {

      yield call(deleteBookGroup, payload);
      yield put({
        type: 'displayDeleteBook',
        payload: false,
      });
    },

    *fetchCategories({ payload }, { call, put }) {
      const response = yield call(fetchCategories);

      yield put({
        type: 'loadCategories',
        payload: response.data,
      });
    },
  },
  reducers: {
    //#region Forms
    displayViewBook(state, { payload }) {
      return {
        ...state,
        viewBookVisible: payload.visible,
        choiceBook: payload.record != undefined ? payload.record : state?.choiceBook,
      };
    },
    displayCreateBook(state, { payload }) {
      return {
        ...state,
        createBookVisible: payload,
      };
    },
    displayEditBook(state, { payload }) {
      const { visible } = payload;
      console.log(state?.choiceBook)
      return {
        ...state,
        editBookVisible: visible,
      };
    },

    displayDeleteBook(state, { payload }) {
      return {
        ...state,
        deleteBookVisible: payload,
      };
    },

    displayScrollBar(state, { payload }) {
      if (payload) {
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
        document.getElementsByTagName('body')[0].style.paddingRight = '0px';
      } else {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        document.getElementsByTagName('body')[0].style.paddingRight = '17px';
      }
      return {
        ...state,
      };
    },

    loadCategories(state, { payload }) {
      return {
        ...state,
        categories: payload,
      };
    },
    //#endregion
  },
};

export default ManageBookModel;
