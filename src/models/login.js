import { routerRedux } from 'dva/router';
import { login, logout } from '../services/user'
import { message } from 'antd' 
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
      const { status, data } = yield call(login, payload); // 登录 TODO
      if (status && data) {
      yield put({type: 'global/updateUserMsg', payload: {
          name: data.name,
          uid: data.uid
        }})
        // 登录成功
        yield put(routerRedux.push('/'));
      } else
      // 登录失败
      message.error('登录失败')
    },
    *logout({ payload }, { call, put }) {
      const { status, data } = yield call(logout, {})
      console.log(status)
      if (status) {
        message.success(data)
        yield put(routerRedux.push('/login'));
      } else {
        message.error(data)
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
