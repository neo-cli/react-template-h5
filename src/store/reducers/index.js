import { connectRouter } from "connected-react-router";
import home from './home'
import history from "@/utils/history";
import cart from './cart';
import profile from './profile';
import mine from './mine';
import produce from "immer";
import { combineReducers } from "redux-immer";

let reducers = {
  home,
  mine,
  profile,
  cart,
  router: connectRouter(history)
}

const rootReducer = combineReducers(produce, reducers);

export default rootReducer;