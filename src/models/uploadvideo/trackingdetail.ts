import {
  fetchBookInDrawer,
  fetchDrawer,
  fetchError,
  fetchRecord,
  fetchTrackingDetail,
  fetchUndifileError,
  findBookShelf,
  getBookById,
  updateError,
  updateUndefined,
} from '@/services/upload';
import _ from 'lodash';
import { Effect, Reducer } from 'umi';

export interface TrackingDetailState {
  data: any;
  isLoading: boolean;
  listError: any;
}

export interface TrackingDetailType {
  namespace: string;
  state: TrackingDetailState;
  effects: {
    fetchData: Effect;
    fetchError: Effect;

    updateError: Effect;
    updateErrorUndefined: Effect;
  };
  reducers: {
    resetState: Reducer;
    isLoading: Reducer;
    loadData: Reducer;
    loadError: Reducer;
  };
}

const TrackingDetailModel: TrackingDetailType = {
  namespace: 'trackingdetail',
  state: {
    data: [],
    isLoading: false,
    listError: [],
  },
  effects: {
    *fetchData({ payload }, { put, call }) {
      yield put({
        type: 'isLoading',
      });

      const detectDrawer = yield call(fetchTrackingDetail, payload);
      if (detectDrawer.length != 0) {
        const tmp = yield call(findBookShelf, detectDrawer[0].bookShelfName);
        console.log('detectDrawer', detectDrawer);
        var bookshelf = tmp.data[0];
        const drawers = yield call(fetchDrawer, bookshelf.id);

        for (let j = 0; j < detectDrawer.length; j++) {
          const drawer = detectDrawer[j];
          console.log('drawer', drawer);

          const error = yield call(fetchError, drawer.id);
          const undifileError = yield call(fetchUndifileError, drawer.id);
          var tmp2 = _.concat(error, undifileError);
          drawer.error = tmp2;
        }

        for (let i = 0; i < drawers.length; i++) {
          var drawer = drawers[i];
          var check = detectDrawer.find((detectDrawer: any) => detectDrawer.drawerId == drawer.id);
          if (check) {
            var tmpBook = yield call(fetchBookInDrawer, drawer.id);
            for (let k = 0; k < tmpBook.data.length; k++) {
              const loadBook = tmpBook.data[k];
              loadBook.key = loadBook.id;
              var errorBook = check.error.find((book: any) => book.bookId == loadBook.id);
              if (errorBook) {
                loadBook.error = errorBook;
              }
            }

            var errorBook = check.error.filter(
              (book: any) => book.typeError == 2 || book.typeError == 1,
            );
            if (errorBook != undefined) {
              var coverError: any = [];
              errorBook.forEach((errorTmp: any) => {
                var tmp: any = {};
                if (errorTmp.bookId != undefined) {
                  tmp = {
                    barCode: errorTmp.bookBarcode,
                    bookGroupId: errorTmp.bookGroupId,
                    bookName: errorTmp.bookName,
                    bookShelfName: errorTmp.bookShelfName,
                    drawerId: errorTmp.drawerId,
                    drawerName: errorTmp.drawerName,
                    error: errorTmp,
                    id: errorTmp.bookId,
                    isAvailable: errorTmp.isAvailable,
                    isDeleted: errorTmp.isDeleted,
                    key: errorTmp.bookId,
                    locationName: 'Red',
                  };
                } else {
                  tmp = {
                    barCode: '',
                    bookGroupId: '',
                    bookName: '',
                    bookShelfName: '',
                    drawerId: '',
                    drawerName: '',
                    error: errorTmp,
                    id: 'Strange Barcode',
                    isAvailable: true,
                    isDeleted: false,
                    key: 1232123123,
                    locationName: '',
                  };
                }

                coverError.push(tmp);
              });
              _.merge(tmpBook.data, coverError);
            }
            check.books = tmpBook.data;
          }
        }
      }
      yield put({
        type: 'loadData',
        payload: detectDrawer,
      });
    },

    *fetchError({ payload }, { put, call }) {
      yield put({
        type: 'isLoading',
      });

      const response = yield call(fetchError, payload);
      const response2 = yield call(fetchUndifileError, payload);
      var tmp = _.concat(response, response2);

      yield put({
        type: 'loadError',
        payload: tmp,
      });
    },

    *updateError({ payload }, { put, call }) {
      yield call(updateError, payload);
    },
    *updateErrorUndefined({ payload }, { put, call }) {
      yield call(updateUndefined, payload);
    },
  },
  reducers: {
    resetState(state, {}) {
      return {
        ...state,
        data: [],
        isLoading: false,
        listError: [],
      };
    },
    isLoading(state, {}) {
      return {
        ...state,
        isLoading: true,
      };
    },
    loadData(state, { payload }) {
      payload.forEach((record: any) => {
        record.key = record.id;
      });
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    },
    loadError(state, { payload }) {
      payload.forEach((error: any) => {
        error.key = error.id;
      });
      return {
        ...state,
        isLoading: false,
        listError: payload,
      };
    },
  },
};

export default TrackingDetailModel;
