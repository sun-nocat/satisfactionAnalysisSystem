import { post, get } from '../utils/request';

/**
 * 登录
 */
export function login(payload) {
  return post('/login', payload);
}

/**
 * 用户信息
 *                  `                                      
 * 
 */
export function userInfo(payload) {
  return get('/user/info', payload)
}

/**
 * 登出
 */
export function logout(payload) {
  return get('/logout', {})
}