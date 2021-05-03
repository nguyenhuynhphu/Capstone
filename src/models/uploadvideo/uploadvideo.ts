import {
  checkingPosition,
  fetchBookInDrawer,
  fetchDrawer,
  findBookShelf,
  getRealPosition,
  insertRecord,
} from '@/services/upload';
import _ from 'lodash';
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
    resetState: Reducer;
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
      const { msgToServer, data, selectedBookShelf } = payload;
      var drawerInSystem: any = yield call(fetchDrawer, selectedBookShelf);

      var found: any = [];
      var notFound: any = [];
      data.list_code.forEach((scanDrawer: any) => {
        drawerInSystem.forEach((drawerInSystem: any) => {
          if (drawerInSystem.barcode != undefined) {
            if (scanDrawer.drawer.trim() == drawerInSystem.barcode.trim()) {
              found.push(drawerInSystem);
            } else {
              notFound.push(drawerInSystem);
            }
          }
        });
      });

      if (found.length != 0) {
        var drawerDetection: any = [];
        var drawerDetectionCorrect: any = [];
        for (let i = 0; i < found.length; i++) {
          const drawer = found[i];
          const response = yield call(fetchBookInDrawer, drawer.id);
          drawer.books = response.data;
        }

        found.forEach((drawer: any) => {
          var correctMsg: any = [];
          // xác định vị trí cho những cuốn sai
          data.list_code.forEach((scanDrawer: any) => {
            //matching pair
            let tmp: any = [];
            let removeBarcode: any = [];
            if (drawer.barcode != undefined) {
              if (drawer.barcode.trim() == scanDrawer.drawer.trim()) {
                drawer.books.map((orgBook: any) => {
                  scanDrawer.books.map((barcode: any) => {
                    if (orgBook.barCode != undefined && orgBook.barCode.trim() == barcode.trim()) {
                      correctMsg.push({
                        drawerId: drawer.id,
                        errorMessage: ``,
                        bookId: orgBook.id,
                        typeError: 6,
                      });

                      tmp.push(orgBook);
                      removeBarcode.push(barcode);
                    }
                  });
                });
                _.pullAll(drawer.books, tmp);
                _.pullAll(scanDrawer.books, removeBarcode);
                drawer.wrongPosition = scanDrawer.books;
              }
            }
          });
          drawerDetectionCorrect.push({
            drawerId: drawer.id,
            correctMsg: correctMsg,
          });
        });

        for (let i = 0; i < found.length; i++) {
          const drawer = found[i];
          var errorMsg: any = [];
          var undefinedError: any = [];
          if (drawer.wrongPosition != undefined) {
            for (let j = 0; j < drawer.wrongPosition.length; j++) {
              const book = drawer.wrongPosition[j];
              const wrongResponse = yield call(checkingPosition, book);
              if (wrongResponse.data.length != 0) {
                if (wrongResponse.data[0].bookShelfName == undefined) {
                  if (wrongResponse.data[0].isDeleted) {
                    errorMsg.push({
                      errorMessage: `Sách này đã bị xóa khỏi hệ thống`,
                      bookId: wrongResponse.data[0].id,
                      typeError: 7,
                    });
                  } else {
                    errorMsg.push({
                      errorMessage: `Sách chưa được thêm vào kệ`,
                      bookId: wrongResponse.data[0].id,
                      typeError: 8,
                    });
                  }
                } else {
                  errorMsg.push({
                    errorMessage: `Sách nằm sai vị trí, bị trí thực sự ở: Bookshelf: ${wrongResponse.data[0].bookShelfName} Drawer: ${wrongResponse.data[0].drawerId} !`,
                    bookId: wrongResponse.data[0].id,
                    typeError: 2,
                  });
                }
              } else {
                undefinedError.push({
                  errorMessage: `Phát hiện barcode lạ: "${book}"`,
                  typeError: 1,
                });
              }
            }
          }

          if (drawer.books.length != 0) {
            for (let j = 0; j < drawer.books.length; j++) {
              const book = drawer.books[j];
              const bookResponse = yield call(getRealPosition, book.id);
              if (bookResponse.data.isAvailable == true) {
                // chưa được mượn
                if (bookResponse.data.patronId == undefined) {
                  // chưa từng đưọcw mượn
                  errorMsg.push({
                    errorMessage: `Sách mất, cuốn này chưa từng được ai mượn !`,
                    bookId: bookResponse.data.id,
                    typeError: 3,
                  });
                } else {
                  // lần cuối mượn và trả rồi
                  errorMsg.push({
                    errorMessage: `Sách mất. Lần cuối được mượn và trả rồi bởi ${bookResponse.data.patronName}`,
                    bookId: bookResponse.data.id,
                    typeError: 4,
                  });
                }
              } else {
                //được mượn
                errorMsg.push({
                  errorMessage: `Sách mất. Sách chưa được trả bởi ${bookResponse.data.patronName}`,
                  bookId: bookResponse.data.id,
                  typeError: 5,
                });
              }
            }
          }
          drawerDetection.push({
            drawerId: drawer.id,
            detectionError: errorMsg,
            undefinedError: undefinedError,
          });
        }
        drawerDetection.forEach((drawerDetection: any) => {
          var tmp = drawerDetectionCorrect.find((x: any) => x.drawerId == drawerDetection.drawerId);
          if (tmp != undefined) {
            drawerDetection.detectionError = _.concat(
              drawerDetection.detectionError,
              tmp.correctMsg,
            );
          }
        });
      }
      Object.assign(msgToServer, {
        drawerDetection: drawerDetection,
      });
      yield call(insertRecord, msgToServer);
    },
  },
  reducers: {
    resetState(state, {}) {
      return {
        ...state,
        uploadModalVisible: false,
        bookshelfData: [],
        responseData: [],
        drawerInBookShelf: [],
      };
    },
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
