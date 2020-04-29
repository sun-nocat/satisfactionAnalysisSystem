import { routerRedux } from 'dva/router';
import { login, logout, userUpdate } from '../services/user'
import { message } from 'antd' 
export default {

  namespace: 'user',

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
      yield put({type: 'global/updateUserMsg', payload: data})
        // 登录成功
        yield put(routerRedux.push('/'));
      } else
      // 登录失败
      message.error('登录失败')
    },
    *logout({ payload }, { call, put }) {
      const { status, data } = yield call(logout, {})
      if (status) {
        message.success(data)
        yield put(routerRedux.push('/login'));
      } else {
        message.error(data)
      }
    },
    // 更新用户信息
    *userUpdate({ payload }, { call, put }) {
      console.log(payload)
      const { data, resolve, reject } = payload;
      const { status } = yield call(userUpdate, data);
      // 信息修改成功
      if (status) {
        yield put({ type: 'global/updateUserMsg', payload: payload.data})
        resolve()
      }else{
        reject()
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
