import { deleteLocation, insertBookShelf, insertLocation } from '@/services/organizebook';
import { Effect, Reducer } from 'umi';

export interface OrganizeBookState {
  viewLocationVisible: boolean;
  createLocationVisible: boolean;
  // editLocationVisible: boolean;
  deleteLocationVisible: boolean;

  createBookShelfVisible: boolean;

  selectedRowKeys: any;

  choiceLocation: any;
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
    //#endregion
    insertLocation: Effect;
    deleteLocation: Effect;

    insertBookShelf: Effect;
    deleteBookShelf: Effect;
    onSelectLocation: Effect;
  };
  reducers: {
    //#region Forms
    displayCreateLocation: Reducer<OrganizeBookState>;
    displayViewLocation: Reducer<OrganizeBookState>;
    displayDeleteLocation: Reducer<OrganizeBookState>;

    displayCreateBookShelf: Reducer<OrganizeBookState>;

    displayScrollBar: Reducer<OrganizeBookState>;
    //#endregion
    loadSelectLocation: Reducer<OrganizeBookState>;
  };
}

const OrganizeBookModel: OrganizeBookType = {
  namespace: 'organizebook',
  state: {
    viewLocationVisible: false,
    createLocationVisible: false,
    // editBookVisible: false,
    deleteLocationVisible: false,

    createBookShelfVisible: false,
    choiceLocation: {},
    selectedRowKeys: [],
  },
  effects: {
    //#region
    *showViewLocation(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayViewLocation',
        payload: true,
      });
    },
    *hideViewLocation(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayViewLocation',
        payload: false,
      });
    },

    *showCreateLocation(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayCreateLocation',
        payload: true,
      });
    },
    *hideCreateLocation(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayCreateLocation',
        payload: false,
      });
    },

    *showDeleteLocation({ payload }, { call, put }) {
      console.log('PAYLOAD', payload);
      yield call(() => {});
      yield put({
        type: 'displayDeleteLocation',
        payload: { visible: true, data: payload },
      });
    },
    *hideDeleteLocation(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayDeleteLocation',
        payload: { visible: false, data: [] },
      });
    },

    *showCreateBookShelf(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield call(() => {});
      yield put({
        type: 'displayCreateBookShelf',
        payload: true,
      });
    },
    *hideCreateBookShelf(_, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
      yield call(() => {});
      yield put({
        type: 'displayCreateBookShelf',
        payload: false,
      });
    },
    //#endregion

    *insertLocation({ payload }, { call, put }) {
      console.log('INSERT CATE: ', payload);
      yield call(insertLocation, payload);
      yield put({
        type: 'displayCreateLocation',
        payload: false,
      });
    },

    *deleteLocation({ payload }, { call, put }) {
      yield call(deleteLocation, payload);
      yield put({
        type: 'displayDeleteLocation',
        payload: {visible: false, data: []},
      });
    },

    *onSelectLocation({ payload }, { call, put }) {
      yield call(() => {});
      yield put({
        type: 'loadSelectLocation',
        payload: { ...payload },
      });
    },

    *insertBookShelf({ payload }, { call, put }) {
      console.log('INSERT CATE: ', payload);
      yield call(insertBookShelf, payload);
      yield put({
        type: 'displayCreateLocation',
        payload: false,
      });
    },   
    *deleteBookShelf({ payload }, { call, put }) {
      console.log('INSERT CATE: ', payload);
      yield call(deleteLocation, payload);
      yield put({
        type: 'displayDeleteLocation',
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
        selectedRowKeys: data,
        deleteLocationVisible: visible,
      };
    },

    displayCreateBookShelf(state, { payload }) {
      return {
        ...state,
        createBookShelfVisible: payload,
      };
    },

    loadSelectLocation(state, { payload }) {
      return {
        ...state,
        viewLocationVisible: true,
        choiceLocation: payload,
      };
    },
  },
};

export default OrganizeBookModel;
