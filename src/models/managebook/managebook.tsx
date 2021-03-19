import {
  deleteBookGroup,
  deleteCategory,
  editBookGroup,
  fetchCategories,
  insertBookGroup,
  insertCategory,
} from '@/services/bookgroup';
import { Effect, Reducer } from 'umi';

export interface ManageBookState {
  //#region Form
  viewBookVisible: boolean;
  createBookVisible: boolean;
  editBookVisible: boolean;
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

    showCreateBook: Effect;
    hideCreateBook: Effect;

    showEditBook: Effect;
    hideEditBook: Effect;

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
    displayViewBook: Reducer<ManageBookState>;
    displayCreateBook: Reducer<ManageBookState>;
    displayEditBook: Reducer<ManageBookState>;
    displayDeleteBook: Reducer<ManageBookState>;

    displayCategoriesModal: Reducer<ManageBookState>;

    loadCategories: Reducer<ManageBookState>;
    loadingButtonRender: Reducer;

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
    categoriesModalVisible: false,
    choiceBook: {},
    categories: [],
    loadingButton: false,
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

    *showDeleteBook({}, { call, put }) {
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
        payload: {}
      });

      var tmpCate: any = [];
      payload.category.forEach((cate: any) => {
        tmpCate.push({ categoryId: cate });
      });
      delete payload.category;
      payload.bookCategory = tmpCate;

      yield call(insertBookGroup, payload);
      yield put({
        type: 'displayCreateBook',
        payload: false,
      });
    },

    *editBookGroup({ payload }, { call, put }) {
      yield put({
        type: 'loadingButton',
        payload: {}
      });
      console.log("PAYLOAD ", payload);
      console.log("date: ", payload.publishDate.utc());
      
      var tmpCate: any = [];
      payload.category.forEach((cate: any) => {
        tmpCate.push({ categoryId: cate });
      });
      delete payload.category;
      payload.bookCategory = tmpCate;

      yield call(editBookGroup, payload);
      yield put({
        type: 'displayEditBook',
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
      if (payload.visible == true) {
        return {
          ...state,
          viewBookVisible: payload.visible,
          choiceBook: payload.record != undefined ? payload.record : state?.choiceBook,
        };
      } else {
        return {
          ...state,
          viewBookVisible: payload.visible,
          choiceBook: {},
        };
      }
    },
    displayCreateBook(state, { payload }) {
      return {
        ...state,
        createBookVisible: payload,
        loadingButton: false,
        choiceBook: {},
      };
    },
    displayEditBook(state, { payload }) {
      const { visible } = payload;
      return {
        ...state,
        editBookVisible: visible,
        loadingButton: false
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
