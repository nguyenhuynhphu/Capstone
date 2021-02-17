import { deleteLibarian, editLibarian, insertLibarian } from '@/services/libarian';
import { visible } from 'chalk';
import { Effect, Reducer } from 'umi';

export interface CustomerPageState {
  viewCustomerVisible: boolean;
  choiceCustomer: any;
}

export interface CustomerPageType {
  namespace: string;
  state: CustomerPageState;
  effects: {
    showViewCustomer: Effect;
    hideViewCustomer: Effect;
  };
  reducers: {
    displayScrollBar: Reducer<CustomerPageState>;
    displayViewCustomer: Reducer<CustomerPageState>;
  };
}

const CustomerPageModel: CustomerPageType = {
  namespace: 'customerpage',
  state: {
    viewCustomerVisible: false,
    choiceCustomer: {},
  },
  effects: {
    //===================================
    *showViewCustomer({ payload }, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield put({
        type: 'displayViewCustomer',
        payload: {visible: true, record: payload},
      });
    },
    *hideViewCustomer(_, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
      yield put({
        type: 'displayViewCustomer',
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
    displayViewCustomer(state, {payload}) {
      const {visible, record} = payload;
      return {
        ...state,
        viewCustomerVisible: visible,
        choiceCustomer: record
      };
    },
  },
};

export default CustomerPageModel;
