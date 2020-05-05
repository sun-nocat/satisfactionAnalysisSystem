import { post, get } from '../utils/request';

/**
 * 提交模型配置数据
 */
export function modelSubmit(payload) {
  return post('/model/submit', payload);
}

/**
 * 模型数据列表
 */

export function modelListUrl(payload) {
  return get('/model/list', payload);
}

/**
 * 删除
 */

export function modelDelUrl(payload) {
  return get('/model/del', payload)
}

/**
 * 详情
 */
export function modelInfoUrl(payload) {
  return get('/model/info', payload)
}