import {
  deleteBookGroup,
  deleteCategory,
  editBookGroup,
  fetchBookById,
  fetchCategories,
  insertBookGroup,
  insertCategory,
} from '@/services/bookgroup';
import { Effect, Reducer } from 'umi';

export interface ManageBookState {
  //#region Form
  viewBookVisible: boolean;
  inputBookVisible: boolean;

  deleteBookVisible: boolean;
  categoriesModalVisible: boolean;

  loadingButton: boolean;
  //#endregion
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

    showInputBook: Effect;
    hideInputBook: Effect;

    showDeleteBook: Effect;
    hideDeleteBook: Effect;

    showCategories: Effect;
    hideCategories: Effect;
    //#endregion
    insertBookGroup: Effect;
    editBookGroup: Effect;
    deleteBookGroup: Effect;
    fetchCategories: Effect;

    insertCategory: Effect;
    deleteCategory: Effect;
  };
  reducers: {
    //#region Forms
    displayViewBook: Reducer;

    displayInputBook: Reducer;

    displayDeleteBook: Reducer;

    displayCategoriesModal: Reducer;

    loadCategories: Reducer;
    loadingButtonRender: Reducer;

    displayScrollBar: Reducer;
    //#endregion
  };
}

const ManageBookModel: ManageBookType = {
  namespace: 'managebook',
  state: {
    viewBookVisible: false,
    inputBookVisible: false,

    deleteBookVisible: false,
    categoriesModalVisible: false,
    choiceBook: {},
    categories: [],
    loadingButton: false,
  },
  effects: {
    //#region Forms
    *showViewBook({ payload }, { call, put }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      const response = yield call(fetchBookById, payload);

      yield put({
        type: 'displayViewBook',
        payload: { visible: true, record: response.data },
      });
    },
    *hideViewBook(_, { call, put }) {
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });

      yield put({
        type: 'displayViewBook',
        payload: { visible: false, record: {} },
      });
    },

    *showInputBook({ payload }, { call, put }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield put({
        type: 'displayInputBook',
        payload: { visible: true, record: payload },
      });
    },

    *hideInputBook({ payload }, { call, put }) {
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
      yield put({
        type: 'displayInputBook',
        payload: { visible: false, record: payload },
      });
    },

    *showDeleteBook({}, { call, put }) {
      yield put({
        type: 'displayDeleteBook',
        payload: true,
      });
    },
    *hideDeleteBook(_, { call, put }) {
      yield put({
        type: 'displayDeleteBook',
        payload: false,
      });
    },

    *showCategories(_, { put }) {
      yield put({
        type: 'displayCategoriesModal',
        payload: true,
      });
    },
    *hideCategories(_, { put }) {
      yield put({
        type: 'displayCategoriesModal',
        payload: false,
      });
    },

    //#endregion
    *insertBookGroup({ payload }, { call, put }) {
      yield put({
        type: 'loadingButton',
        payload: {},
      });

      var tmpCate: any = [];
      payload.category.forEach((cate: any) => {
        tmpCate.push({ categoryId: cate });
      });
      delete payload.category;
      payload.bookCategory = tmpCate;

      yield call(insertBookGroup, payload);
    },

    *editBookGroup({ payload }, { call, put }) {
      yield put({
        type: 'loadingButton',
        payload: {},
      });

      var tmpCate: any = [];
      payload.category.forEach((cate: any) => {
        tmpCate.push({ categoryId: cate });
      });
      delete payload.category;
      payload.bookCategory = tmpCate;

      yield call(editBookGroup, payload);
    },

    *deleteBookGroup({ payload }, { call, put }) {
      yield call(deleteBookGroup, payload);
    },

    *fetchCategories({}, { call, put }) {
      const response = yield call(fetchCategories);

      yield put({
        type: 'loadCategories',
        payload: response.data,
      });
    },

    *insertCategory({ payload }, { call, put }) {
      yield call(insertCategory, payload);
    },
    *deleteCategory({ payload }, { call, put }) {
      yield call(deleteCategory, payload);
    },
  },
  reducers: {
    //#region Forms
    displayViewBook(state, { payload }) {

      return {
        ...state,
        viewBookVisible: payload.visible,
        choiceBook: payload.record,
      };
    },
    displayInputBook(state, { payload }) {
      return {
        ...state,
        inputBookVisible: payload.visible,
        loadingButton: false,
        choiceBook: payload.record,
        // displayViewBook: !payload.visible,
      };
    },

    displayDeleteBook(state, { payload }) {
      return {
        ...state,
        deleteBookVisible: payload,
      };
    },

    displayCategoriesModal(state, { payload }) {
      return {
        ...state,
        categoriesModalVisible: payload,
      };
    },

    loadingButtonRender(state, { payload }) {
      return {
        ...state,
        loadingButton: true,
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
