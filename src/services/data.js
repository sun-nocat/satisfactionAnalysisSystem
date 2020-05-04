import { post, get } from '../utils/request';

/**
 * 导入数据
 */
export function dataImport(payload) {
  return post('/data/import', payload);
}

/**
 * 数据列表
 */
export function dataList(payload) {
  return get('/data/list', payload)
}

/**
 * 数据详情
 */
export function dataInfo(payload) {
  return post('/data/info', payload)
}

/**
 * 数据删除
 */
export function dataDel(payload) {
  return get('/data/del', payload)
}