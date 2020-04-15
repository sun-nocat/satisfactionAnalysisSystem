import { routerRedux } from 'dva/router';
import { login } from '../services/login'

/**
 * 全局model
 */
export default {
  namespace: 'global',
  state: {
    user: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    // 更新用户信息
    updateUserMsg(state, action) {
      return { ...state, user: action.payload}
    }
  },

};
