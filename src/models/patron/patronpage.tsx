import { deleteLibarian, editLibarian, insertLibarian } from '@/services/libarian';
import { visible } from 'chalk';
import { Effect, Reducer } from 'umi';

export interface PatronPageState {
  viewPatronVisible: boolean;
  choicePatron: any;
}

export interface PatronPageType {
  namespace: string;
  state: PatronPageState;
  effects: {
    showViewPatron: Effect;
    hideViewPatron: Effect;
  };
  reducers: {
    displayScrollBar: Reducer;
    displayViewPatron: Reducer;
  };
}

const PatronPageModel: PatronPageType = {
  namespace: 'patronpage',
  state: {
    viewPatronVisible: false,
    choicePatron: {},
  },
  effects: {
    //===================================
    *showViewPatron({ payload }, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield put({
        type: 'displayViewPatron',
        payload: {visible: true, record: payload},
      });
    },
    *hideViewPatron(_, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
      yield put({
        type: 'displayViewPatron',
        payload: {visible: false, record: {}},
      });
      
    }
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
    displayViewPatron(state, {payload}) {
      const {visible, record} = payload;
      return {
        ...state,
        viewPatronVisible: visible,
        choicePatron: record
      };
    },
  },
};

export default PatronPageModel;
