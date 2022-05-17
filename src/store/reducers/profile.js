import * as actionTypes from '@/store/action-types';
//ProfileState的初始值
const initialState = {
  loginState: 'UN_VALIDATE',
  user: null,
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.VALIDATE:
        if (action.payload.code === 0) {
          return {
            loginState: 'LOGINED',
            user: action.payload.data,
            error: null
          }
        } else {
          return {
            loginState: 'UN_LOGINED',
            user: null,
            error: action.payload
          }
        }
    case actionTypes.LOGOUT:
      return {
        loginState: 'UN_LOGINED',
        user: null,
        error: null
      }
    case actionTypes.SET_AVATAR:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload
        }
      }
    default:
      break;
  }
  return state;
}
