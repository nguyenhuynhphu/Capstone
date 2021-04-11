import { deleteBookShelf } from '@/services/bookshelf';
import {
  deleteLocation,
  editLocation,
  insertBookShelf,
  insertLocation,
} from '@/services/organizebook';
import { Effect, Reducer } from 'umi';

export interface OrganizeBookState {
  viewLocationVisible: boolean;
  createLocationVisible: boolean;
  // editLocationVisible: boolean;
  deleteLocationVisible: boolean;

  createBookShelfVisible: boolean;

  organizeBookVisible: boolean;

  bookshelfLocate: {};

  selectedRowKeys: any;

  choiceLocation: any;
  choiceBookShelf: any;
}

export interface OrganizeBookType {
  namespace: string;
  state: OrganizeBookState;
  effects: {
    //#region Forms
    showCreateLocation: Effect;
    hideCreateLocation: Effect;

    showViewLocation: Effect;
    hideViewLocation: Effect;

    showDeleteLocation: Effect;
    hideDeleteLocation: Effect;

    showCreateBookShelf: Effect;
    hideCreateBookShelf: Effect;

    hideOrganizeBookShelf: Effect;
    //#endregion
    insertLocation: Effect;
    deleteLocation: Effect;
    editLocation: Effect;

    insertBookShelf: Effect;
    deleteBookShelf: Effect;

    resetBookShelfLocate: Effect;
    filterBookShelfLocate: Effect;

    onSelectLocation: Effect;
    onSelectBookShelf: Effect;
  };
  reducers: {
    //#region Forms
    displayCreateLocation: Reducer;
    displayViewLocation: Reducer;
    displayDeleteLocation: Reducer;
    displayCreateBookShelf: Reducer;
    displayOrganizeBookShelf: Reducer;
    displayScrollBar: Reducer;
    //#endregion
    loadSelectLocation: Reducer;
    loadSelectBookShelf: Reducer;
    filterBookShelf: Reducer;
    resetBookShelfLocate: Reducer;
  };
}

const OrganizeBookModel: OrganizeBookType = {
  namespace: 'organizebook',
  state: {
    viewLocationVisible: false,
    createLocationVisible: false,
    // editBookVisible: false,
    deleteLocationVisible: false,
    organizeBookVisible: false,
    createBookShelfVisible: false,
    bookshelfLocate: {
      rowStart: 1,
      rowEnd: 1,
      colStart: 1,
      colEnd: 1,
    },
    choiceLocation: {},
    choiceBookShelf: {},
    selectedRowKeys: [],
  },
  effects: {
    //#region
    *showViewLocation(_, { call, put }) {
      yield put({
        type: 'displayViewLocation',
        payload: true,
      });
    },
    *hideViewLocation(_, { call, put }) {
      yield put({
        type: 'displayViewLocation',
        payload: false,
      });
    },

    *showCreateLocation(_, { call, put }) {
      yield put({
        type: 'displayCreateLocation',
        payload: true,
      });
    },
    *hideCreateLocation(_, { call, put }) {
      yield put({
        type: 'displayCreateLocation',
        payload: false,
      });
    },

    *showDeleteLocation({ payload }, { call, put }) {
      yield put({
        type: 'displayDeleteLocation',
        payload: { visible: true, data: payload },
      });
    },
    *hideDeleteLocation(_, { call, put }) {
      yield put({
        type: 'displayDeleteLocation',
        payload: { visible: false, data: [] },
      });
    },

    *showCreateBookShelf(_, { call, put }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });

      yield put({
        type: 'displayCreateBookShelf',
        payload: true,
      });
    },
    *hideCreateBookShelf(_, { call, put }) {
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });

      yield put({
        type: 'displayCreateBookShelf',
        payload: false,
      });
    },

    *hideOrganizeBookShelf(_, { call, put }) {
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });

      yield put({
        type: 'displayOrganizeBookShelf',
        payload: false,
      });
    },
    *resetBookShelfLocate(_, { call, put }) {
      yield put({
        type: 'displayOrganizeBookShelf',
        payload: false,
      });
    },
    //#endregion

    *insertLocation({ payload }, { call, put }) {
      yield call(insertLocation, payload);
      yield put({
        type: 'displayCreateLocation',
        payload: false,
      });
    },
    *editLocation({ payload }, { call, put }) {
      yield call(editLocation, payload);
      yield put({
        type: 'displayCreateLocation',
        payload: false,
      });
    },

    *deleteLocation({ payload }, { call, put }) {
      yield call(deleteLocation, payload);
      yield put({
        type: 'displayDeleteLocation',
        payload: { visible: false, data: [] },
      });
    },

    *onSelectLocation({ payload }, { call, put }) {
      yield put({
        type: 'loadSelectLocation',
        payload: { ...payload },
      });
    },

    *onSelectBookShelf({ payload }, { call, put }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield put({
        type: 'loadSelectBookShelf',
        payload: { ...payload },
      });
    },

    *insertBookShelf({ payload }, { call, put }) {
      yield call(insertBookShelf, payload);
      yield put({
        type: 'displayCreateLocation',
        payload: false,
      });
    },

    *deleteBookShelf({ payload }, { call, put }) {
      yield call(deleteBookShelf, payload);
    },

    *filterBookShelfLocate({ payload }, { call, put }) {
      yield put({
        type: 'filterBookShelf',
        payload: payload,
      });
    },
  },
  reducers: {
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

    displayViewLocation(state, { payload }) {
      return {
        ...state,
        viewLocationVisible: payload,
      };
    },

    displayCreateLocation(state, { payload }) {
      return {
        ...state,
        createLocationVisible: payload,
      };
    },

    displayDeleteLocation(state, { payload }) {
      const { visible, data } = payload;
      return {
        ...state,
        viewLocationVisible: visible,
      };
    },

    displayCreateBookShelf(state, { payload }) {
      return {
        ...state,
        createBookShelfVisible: payload,
      };
    },
    displayOrganizeBookShelf(state, { payload }) {
      return {
        ...state,
        organizeBookVisible: payload,
      };
    },
    loadSelectLocation(state, { payload }) {
      return {
        ...state,
        viewLocationVisible: true,
        choiceLocation: payload,
      };
    },

    loadSelectBookShelf(state, { payload }) {
      return {
        ...state,
        organizeBookVisible: true,
        choiceBookShelf: payload,
      };
    },

    filterBookShelf(state, { payload }) {
      return {
        ...state,
        bookshelfLocate: payload,
      };
    },
    resetBookShelfLocate(state, { payload }) {
      return {
        ...state,
        bookshelfLocate: {
          rowStart: 1,
          rowEnd: 1,
          colStart: 1,
          colEnd: 1,
        },
      };
    },
  },
};

export default OrganizeBookModel;
