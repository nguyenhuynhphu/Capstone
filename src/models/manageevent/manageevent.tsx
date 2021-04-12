import { Effect, Reducer } from 'umi';

export interface ManageEventState {
  createCampaignVisible: boolean;

  booksVisible: boolean;
}

export interface ManageEventType {
  namespace: string;
  state: ManageEventState;
  effects: {
    showCreateCampaign: Effect;
    hideCreateCampaign: Effect;

    showBooks: Effect;
    hideBooks: Effect;
  };
  reducers: {
    displayScrollBar: Reducer<ManageEventState>;

    displayCampaign: Reducer<ManageEventState>;
    displayBooks: Reducer<ManageEventState>;
  };
}

const ManageEventModel: ManageEventType = {
  namespace: 'manageevent',
  state: {
    createCampaignVisible: false,
    booksVisible: false,
  },
  effects: {
    *showCreateCampaign(_, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: false,
      });
      yield put({
        type: 'displayCampaign',
        payload: true,
      });
    },
    *hideCreateCampaign(_, { put }) {
      yield put({
        type: 'displayScrollBar',
        payload: true,
      });
      yield put({
        type: 'displayCampaign',
        payload: false,
      });
    },
    *showBooks(_, { put }) {
      yield put({
        type: 'displayBooks',
        payload: true,
      });
    },
    *hideBooks(_, { put }) {
      yield put({
        type: 'displayBooks',
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
    displayCampaign(state, { payload }) {
      return {
        ...state,
        createCampaignVisible: payload,
      };
    },
    displayBooks(state, { payload }) {
      return {
        ...state,
        booksVisible: payload,
      };
    },
  },
};

export default ManageEventModel;
