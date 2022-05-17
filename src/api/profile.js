import request from './index';

export function validate() {
  return request.post(`/auth/validate`);
}

//T其实就代表真正的返回的数据
export function register(values) {
  return request.post(`/user/register`, values);
}
export function login(values) {
  return request.post(`/auth/login`, values);
}
