import { deleteLibarian, editLibarian, insertLibarian } from '@/services/libarian';
import sendNotification from '@/utils/Notification';
import { notification } from 'antd';
import { visible } from 'chalk';
import { Effect, Reducer } from 'umi';

export interface LibarianPageState {
  inputLibarianVisible: boolean;
  updateLibrarianVisible: boolean;
  viewLibarianVisible: boolean;

  choiceLibarian: any;
}

export interface LibarianPageType {
  namespace: string;
  state: LibarianPageState;
  effects: {
    //#region Page Formm
    showViewLibarian: Effect;
    hideViewLibarian: Effect;

    //#endregion

    insertLibarian: Effect;
    deleteLibarian: Effect;
    editLibarian: Effect;
  };
  reducers: {
    displayScrollBar: Reducer;
    displayViewLibarian: Reducer;
    displayUpdateLibrarian: Reducer;
    displayInputForm: Reducer;
  };
}

const LibarianPageModel: LibarianPageType = {
  namespace: 'libarianpage',
  state: {
    inputLibarianVisible: false,
    viewLibarianVisible: false,
    updateLibrarianVisible: false,
    choiceLibarian: {},
  },
  effects: {
    //#region Form
    //===================================
    *showViewLibarian({ payload }, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield put({
        type: 'displayViewLibarian',
        payload: { visible: true, record: payload },
      });
    },
    *hideViewLibarian(_, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
      yield put({
        type: 'displayViewLibarian',
        payload: { visible: false, record: {} },
      });
    },
    //===================================
    //#endregion
    *insertLibarian({ payload }, { put, call }) {
      const response = yield call(insertLibarian, payload);
      if (response.data.id != undefined) {
        notification.open({
          message: 'New librarian was created !',
          type: 'success',
          description: 'New librarian created, please re check information !',
          duration: 2,
        });
        yield put({
          type: 'displayInputForm',
          payload: false,
        });
      } else {
        notification.open({
          message: 'Create librarian fail !',
          type: 'error',
          description: 'Something went wrong, please re check input field !',
          duration: 2,
        });
      }
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
    },
    *deleteLibarian({ payload }, { call }) {
      yield call(deleteLibarian, payload);
      sendNotification("Delete librarian success !", "", "success");
    },
    *editLibarian({ payload }, { put, call }) {
      const response = yield call(editLibarian, payload);
      if (response.data) {
        notification.open({
          message: 'Librarian was updated !',
          type: 'success',
          description: 'Llibrarian infor have success update !',
          duration: 2,
        });
        yield put({
          type: 'displayInputForm',
          payload: false,
        });
      } else {
        notification.open({
          message: 'Update librarian fail !',
          type: 'error',
          description: 'Something went wrong, please re check input field !',
          duration: 2,
        });
      }
      yield put({
        type: 'displayScrollBar',
        payload: true,
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

    displayInputForm(state, { payload }) {
      return {
        ...state,
        inputLibarianVisible: payload,
      };  
    },
    displayUpdateLibrarian(state, { payload }) {
      return {
        ...state,
        updateLibrarianVisible: payload,
      };  
    },

    displayViewLibarian(state, { payload }) {
      const { visible, record } = payload;
      return {
        ...state,
        viewLibarianVisible: visible,
        choiceLibarian: record,
      };
    },
  },
};

export default LibarianPageModel;
