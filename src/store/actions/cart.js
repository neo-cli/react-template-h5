import * as actionTypes from '@/store/action-types';
import { message } from 'antd';

export default {
  addCartItem(lesson) {
    return function(dispatch) {
      dispatch({
        type: actionTypes.ADD_CART_ITEM,
        payload: lesson
      });
      message.info('添加购物车成功');
    }
  },
  changeCartItemCount(id, count) {
    return {
      type: actionTypes.CHANGE_CART_ITEM_COUNT,
      payload: { id, count }
    }
  },
  removeCartItem(id) {
      return {
        type: actionTypes.REMOVE_CART_ITEM,
        payload: id
      }
  },
  changeCheckedCartItems(checkIds) {
      return {
        type: actionTypes.CHANGE_CHECKED_CART_ITEMS,
        payload: checkIds
      }
  },
  clearCartItems() {
      return {
        type: actionTypes.CLEAR_CART_ITEM
      }
  },
  settle() {
    debugger
    return {
      type: actionTypes.SETTLE
    }
  }
}
