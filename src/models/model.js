
import { modelSubmit, modelListUrl, modelDelUrl, modelInfoUrl } from '../services/model'
import { message } from 'antd';

const formInfo = {
  name:'',
  dataSource: '',
  lam: `[
    [1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
]`,
  method: 'ml',
  step: 0.01,
  max_iter:'10000',
  rdd: '3',
}

const formInfo2 = {
  name:'',
  dataSource: '',
  x: `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]`, // 内源变量在样本中的维度所占列数集合
  y: `[24]`, // 外源变量在样本中的维度所占列数集合
  lam_x: `[[1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1],]`, // 内源变量的因子载荷初值
  lam_y:`[
    [1, 1, 1, 1, 1, 1],
  ]`, // 外源变量的因子载荷初值
  beta: `[
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]`, // 路径方程中外源变量的系数初值
  gamma: `[
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]`, // 路径方程中内源变量的系数初值
  method: 'ml', // 参数估计方法
  step: 0.01,
  max_iter:'10000',
  rdd: '3',
}


export default {

  namespace: 'model',

  state: {
    formInfo: formInfo,
    formInfo2:formInfo2,
    modelList:[],
    modelInfo:{},
    modelVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *onValueChange({ payload }, { call, put }) {
      yield put({type: 'updateModelData', payload: payload})
    },
    *onValueChange2({ payload }, { call, put }) {
      yield put({type: 'updateModelData2', payload: payload})
    },
    *submit({ payload }, {call,put, select}) {
      const modelState = yield select((state)=>state.model)
      console.log(modelState)
      const { resolve, reject, type } = payload;
      if (type === 'measurement') {
        const { status, data } = yield call(modelSubmit, {...modelState.formInfo, type: type})
        if(status) {
          resolve()
          yield put({type: 'clear', payload: {}})
        } else {
          reject()
        }
      } else {
        const { status, data } = yield call(modelSubmit, {...modelState.formInfo2, type: type})
        if(status) {
          resolve()
          yield put({type: 'clear', payload: {}})
        } else {
          reject()
        }
      }

    },
    *modelList({ payload }, {call, put, select }) {
      const { status, data } = yield call(modelListUrl, {})
      if (status) {
        yield put({type: 'updateModelList', payload: data})
      }else{
      }
    },
    *del({ payload }, {call, put}) {
      const {status, data} = yield call(modelDelUrl,payload)
      if (status) {
        message.success('删除成功！')
        yield put({type: 'modelList', payload: {}})
      }else{
        message.error('删除失败！')
      }
    },
    *info({ payload }, {call,put}) {
      const {status, data} = yield call(modelInfoUrl,payload)
      if (status) {
        yield put({type: 'updateModelInfo', payload: data})
      }else{
        message.error('删除失败！')
      }
    },
    *visible({payload}, {call, put}) {
      yield put({type: 'updateModelVisible', payload: payload})
    }
  },

  reducers: {
    updateModelData(state, action) {
      return { ...state, formInfo: { ...state.formInfo, ...action.payload}}
    },
    updateModelData2(state, action) {
      return { ...state, formInfo2: { ...state.formInfo2, ...action.payload}}
    },
    updateModelList(state, action) {
      return {...state, modelList: action.payload}
    },
    clear(state, action) {
      return {
        ...state,
        formInfo:formInfo,
        formInfo2:formInfo2,
        modelInfo: {}
      }
    },
    updateModelInfo(state, action) {
      return {...state, modelInfo: action.payload }
    },
    updateModelVisible(state, action) {
      return { ...state, modelVisible: action.payload}
    }
  },

};
