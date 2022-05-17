import * as actionTypes from '@/store/action-types';
import { getSliders, getLessons } from '@/api/home';
export default {
    setCurrentCategory(currentCategory) {
        return {
          type: actionTypes.SET_CURRENT_CATEGORY,
          payload: currentCategory
        }
    },
    getSliders() {
        // getSliders()会返回一个promise 你向仓库里派发一个这样action.action.payload是一个promise
        // redux-promise中间件会等待promise完成。完成这后会再次向仓库派发action dispatch({type:GET_SLIDERS,payload:SliderData})
        return {
          type: actionTypes.GET_SLIDERS,
          payload: getSliders()
        }
    },
    //获取课程列表数据 获取下一页数据并合并到当前列表中
    getLessons() {
        return function (dispatch, getState) {
            (async function () {
                let { currentCategory, lessons: { hasMore, pageNum, pageSize, loading } } = getState().home;
                if (!loading && hasMore) {
                    dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });//先把loading设置为true
                    let result = await getLessons(currentCategory, pageNum, pageSize);
                    //调接口加载数据
                    dispatch({
                      type: actionTypes.SET_LESSONS,
                      payload: result.data
                    });//先把loading设置为true

                }
            })();
        }
    },
    refreshLessons() {
        return function (dispatch, getState) {
            (async function () {
                let { currentCategory, lessons: { limit, loading } } = getState().home;
                if (!loading) {
                    dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });//先把loading设置为true
                    let result = await getLessons(currentCategory, 0, limit);
                    //调接口加载数据
                    dispatch({
                        type: actionTypes.REFRESH_LESSONS,
                        payload: result.data
                    });//先把loading设置为true

                }
            })();
        }
    }
}
