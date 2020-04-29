import { routerRedux } from 'dva/router';
import { userInfo } from '../services/user'

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
    *fetchUserInfo({ payload }, { call, put }) {
      const {status, data} = yield call(userInfo, {})
      console.log(status, data)
      // 获取到用户信息--登录成功
      if (status){
        yield put({
          type: 'updateUserMsg',
          payload: data
        })
      }else{
        // 获取不到用户信息，说明用户没有登录--重定向到登录页面
        yield put(routerRedux.push('/login'));
      }
    },
  },

  reducers: {
    // 更新用户信息
    updateUserMsg(state, action) {
      return { ...state, user: action.payload}
    }
  },

};
