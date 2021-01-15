import { deleteLibarian, editLibarian, insertLibarian } from '@/services/libarian';
import { visible } from 'chalk';
import { Effect, Reducer } from 'umi';

export interface LibarianPageState {
  createLibarianVisible: boolean;
  viewLibarianVisible: boolean;
  editLibarianVisible: boolean;

  choiceLibarian: any;
}

export interface LibarianPageType {
  namespace: string;
  state: LibarianPageState;
  effects: {
    //#region Page Formm
    showCreateLibarian: Effect;
    hideCreateLibarian: Effect;

    showViewLibarian: Effect;
    hideViewLibarian: Effect;

    showEditLibarian: Effect;
    hideEditLibarian: Effect;
    //#endregion

    insertLibarian: Effect;
    deleteLibarian: Effect;
    editLibarian: Effect;
  };
  reducers: {
    displayScrollBar: Reducer<LibarianPageState>;
    displayCreateLibarian: Reducer<LibarianPageState>;
    displayViewLibarian: Reducer<LibarianPageState>;
    displayEditLibarian: Reducer<LibarianPageState>;
  };
}

const LibarianPageModel: LibarianPageType = {
  namespace: 'libarianpage',
  state: {
    createLibarianVisible: false,
    viewLibarianVisible: false,
    editLibarianVisible: false,
    choiceLibarian: {},
  },
  effects: {
    //#region Form
    *showCreateLibarian(_, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield put({
        type: 'displayCreateLibarian',
        payload: true,
      });
    },
    *hideCreateLibarian(_, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
      yield put({
        type: 'displayCreateLibarian',
        payload: false,
      });
    },
    //===================================
    *showViewLibarian({ payload }, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield put({
        type: 'displayViewLibarian',
        payload: {visible: true, record: payload},
      });
    },
    *hideViewLibarian(_, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
      yield put({
        type: 'displayViewLibarian',
        payload: {visible: false, record: {}},
      });
      
    },
    //===================================
    *showEditLibarian({ payload }, { put }) {
      yield put({
        type: 'displayEditLibarian',
        payload: true,
      });
    },
    *hideEditLibarian(_, { put }) {
      yield put({
        type: 'displayEditLibarian',
        payload: false,
      });
      
    },
    //#endregion
    *insertLibarian({ payload }, { put, call }) {
      yield call(insertLibarian, payload);
      yield put({
        type: 'displayCreateLibarian',
        payload: false,
      });
    },
    *deleteLibarian({ payload }, { call }) {
      yield call(deleteLibarian, payload);
    },
    *editLibarian({ payload }, { put, call }) {
      yield call(editLibarian, payload);
      yield put({
        type: 'displayEditLibarian',
        payload: false,
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
    displayCreateLibarian(state, { payload }) {
      return {
        ...state,
        createLibarianVisible: payload,
      };
    },
    displayViewLibarian(state, {payload}) {
      const {visible, record} = payload;
      return {
        ...state,
        viewLibarianVisible: visible,
        choiceLibarian: record
      };
    },
    displayEditLibarian(state, {payload}) {
      return {
        ...state,
        editLibarianVisible: payload,
      };
    },
  },
};

export default LibarianPageModel;
