import { post, get } from '../utils/request';

/**
 * 提交模型配置数据
 */
export function modelSubmit(payload) {
  return post('/model/submit', payload);
}
