import { findBookShelf, insertRecord } from '@/services/upload';
import { Effect, Reducer } from 'umi';

export interface UploadVideoState {
  uploadModalVisible: boolean;
  

  responseData: any;


  bookshelfData: any;
  drawerInBookShelf: any;
}

export interface UploadVideoType {
  namespace: string;
  state: UploadVideoState;
  effects: {
    loadBookShelf: Effect;
    fetchDrawer: Effect;
    insertRecord: Effect;
  };
  reducers: {
    renderModel: Reducer;

    renderBookShelf: Reducer;
    renderDrawer: Reducer;
  };
}

const UploadVideoModel: UploadVideoType = {
  namespace: 'uploadvideo',
  state: {
    uploadModalVisible: false,
    bookshelfData: [],
    responseData: [],
    drawerInBookShelf: [],
  },
  effects: {
    *loadBookShelf({ payload }, { put, call }) {
      const response = yield call(findBookShelf, payload);

      yield put({
        type: 'renderBookShelf',
        payload: response.data,
      });
    },

    *fetchDrawer({ payload }, { put, call }) {
      const response = yield call(findBookShelf, payload);
      yield put({
        type: 'renderDrawer',
        payload: response,
      });
    },

    *insertRecord({ payload }, { put, call }) {
      const response = yield call(insertRecord, payload);
      console.log("Response >>>>>>>>>", response);
      
    },
    
  },
  reducers: {
    renderModel(state, { payload }) {
      return {
        ...state,
        uploadModalVisible: payload,
      };
    },
    renderBookShelf(state, { payload }) {
      return {
        ...state,
        bookshelfData: payload,
      };
    },
    renderDrawer(state, { payload }) {
      return {
        ...state,
        drawerInBookShelf: payload,
      };
    },
  },
};

export default UploadVideoModel;
