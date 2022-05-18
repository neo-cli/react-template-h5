import axios from 'axios';
import history from '@/utils/history';
axios.defaults.baseURL = "http://106.55.26.154:3003/api";
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8";
axios.interceptors.request.use((config) => {
    let access_token = sessionStorage.getItem('access_token');
    if (access_token)
        config.headers['Authorization'] = `Bearer ${access_token}`;
    return config;
}, (error) => Promise.reject(error));
//response拦截器里把AxiosResponse=>AxiosResponse.data
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  if (error.response.status === 401) {
    history.push('/profile')
  } else {
    return Promise.reject(error)
  }
});
export default axios;
