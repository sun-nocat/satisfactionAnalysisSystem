import { routerRedux } from 'dva/router';
import { login } from '../services/login'
export default {

  namespace: 'login',

  state: {
    isLogin: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *submit({ payload }, { call, put }) { 
      // const { status, data } = yield call(login, payload); // 登录 TODO
      const status = true;
      const data = true;
      if (status && data) {
      yield put({type: 'global/updateUserMsg', payload: {
          name: 'test'
        }})
        // 登录成功
        yield put(routerRedux.push('/'));
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
