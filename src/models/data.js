import { dataImport, dataList, dataInfo, dataDel } from '../services/data'
import { message } from 'antd';

export default {

  namespace: 'data',

  state: {
    dataList: [],
    dataInfo: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *importData({ payload }, { call, put }) {
      console.log('paylod', payload)
      const { data, reject, resolve } = payload
      const { status, data: resData } = yield call(dataImport,data);
      if(status) {
        message.success('导入成功')
        resolve()
      } else {
        reject()
      }
    },
    *dataList({ payload }, { call, put }) {
      const { status, data } = yield call(dataList, {})
      if (status) {
        yield put({ type: 'updateDataList', payload: data})
      }
    },
    *clearDataList({ payload }, { call, put }) {
      yield put({ type: 'updateDataList', payload: []})
    },
    // 详情
    *dataInfo( {payload }, { call, put } ){
      const { status, data } = yield call(dataInfo, payload)
      if (status) {
        yield put({ type: 'updateDataInfo', payload: data})
      }
    },
    // 删除
    *dataDel( { payload }, { call, put }) {
      const { uid, resolve, reject  } = payload;
      const { status, data: resData } = yield call(dataDel, {uid:uid})
      if (status) {
        yield put({ type: 'dataList', payload: {}})
        resolve()
      } else {
        reject()
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    updateDataList(state, action) {
      return { ...state,dataList: action.payload}
    },
    updateDataInfo(state, action) {
      return { ...state,dataInfo: action.payload}
    },
  },

};
