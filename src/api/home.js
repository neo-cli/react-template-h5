import request from "./index";

export function getSliders(pageNum = 0, pageSize = 10) {
  return request.get(`/role?pageNum=${pageNum}&pageSize=${pageSize}`);
}
/**
 * @param category 要获取哪个分类下面的课程列表 all是全部 react vue
 * @param offset 从哪个索引开始获取
 * @param limit  限定要返回的条目数
 */
export function getLessons(category = "all", pageNum, pageSize) {
  return request.get(
    `/course?category=${category}&pageNum=${pageNum}&pageSize=${pageSize}`
  );
}

export function getLesson(id) {
  return request.get(`/course/${id}`);
}
