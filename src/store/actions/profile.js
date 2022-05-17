import * as actionTypes from '@/store/action-types';
import { validate } from '@/api/profile';
import { push } from 'connected-react-router';
import { message } from 'antd';
import { register, login } from '@/api/profile';

export default {
  validate() {
    return {
      type: actionTypes.VALIDATE,
      payload: validate()
    }
  },
  logout() {
    return function(dispatch) {
      sessionStorage.removeItem('access_token');
      dispatch(push('/login'))
    }
  },
  register(values) {
    return function (dispatch, getState) {
        (async function () {
            try {
                //AxiosResponse data才是响应体
                let result = await register(values);
                if (result.success) {
                    dispatch(push('/login'));
                } else {
                    message.error('注册失败');
                }
            } catch (error) {
                message.error('注册失败');
            }
        })();
    }
  },
  login(values) {
    return function (dispatch, getState) {
      (async function () {
          try {
              //AxiosResponse data才是响应体
              let result = await login(values);
              if (result.code === 0) {
                  sessionStorage.setItem('access_token', result.data.token);
                  dispatch(push('/profile'));
              } else {
                  message.error('登录失败');
              }
          } catch (error) {
              message.error('登录失败');
          }
      })();
    }
  },
  setAvatar(avatarUrl) {
    return {
      type: actionTypes.SET_AVATAR,
      payload: avatarUrl
    }
  }
}
/**
 * JWT如何退出登录
 * 只要客户端把本地的token删除了，再发的时候就没有
 */
