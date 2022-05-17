import * as actionTypes from '@/store/action-types';
const initialState = {
  currentCategory: 'all',
  sliders: [],
  lessons: {
    loading: false,// 如果正在加载中的话，loading=true
    list: [],
    hasMore: true,//刚开始肯定为true,如果服务器还有更多数据，就为true.
    pageNum: 0,//下次去服务器端接数的时候从哪个索引开始拉
    pageSize: 5 //限定每次拉的条数
  }
}
//immer 不可变数据集  redux-immutable  redux-immer
export default function (state = initialState, action) {
  switch (action.type) {
      case actionTypes.SET_CURRENT_CATEGORY:
        return { ...state, currentCategory: action.payload };
      case actionTypes.GET_SLIDERS:
        //  dispatch({ ...action, payload: error, error: true });
        if (action.error) {// action有了error属性，那说明promise失败了
          return state;
        } else {
          return { ...state, sliders: action.payload.data.roles };
        }
      case actionTypes.SET_LESSONS_LOADING:
        //redux规定reducer永远要返回一个新的状态
        state.lessons.loading = action.payload;
        return state;
      case actionTypes.SET_LESSONS:
        state.lessons.loading = false;
        state.lessons.list = [...action.payload.courses];
        console.log(state.lessons.list, 'ccccccc')
        state.lessons.hasMore =action.payload.count > action.payload.courses.length ? true : false;
        state.lessons.pageNum = 0;
        state.lessons.pageSize = action.payload.courses.length + state.lessons.pageSize;
        return state;
      case actionTypes.REFRESH_LESSONS:
        state.lessons.loading = false;
        state.lessons.list = action.payload.courses;
        state.lessons.list = Array.from(new Set(state.lessons.list))
        state.lessons.hasMore = action.payload.count > action.payload.courses.length ? true : false;
        state.lessons.pageNum = 0;
        state.lessons.pageSize = action.payload.courses.length + state.lessons.pageSize;
        return state;
      default:
        return state;
  }
}
