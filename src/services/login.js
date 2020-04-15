import { post } from '../utils/request';

/**
 * 登录
 */
export function login(payload) {
  return post('/login', payload);
}
