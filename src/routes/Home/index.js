import React, { useRef, useEffect } from 'react';
import './index.less';
import { connect } from 'react-redux';
import mapDispatchToProps from '@/store/actions/home';
import HomeHeader from './components/HomeHeader';
import HomeSliders from './components/HomeSliders';
import LessonList from './components/LessonList';
import {
  loadMore,
  downRefresh,
  throttle
} from '@/utils'
import { Spin } from 'antd'
function Home(props) {
  const homeContainerRef = useRef(null)//后面用来实现上拉加载，下拉刷新，虚拟列表
  const lessonListRef = useRef(null)//用来实现虚拟列表
  useEffect(() => {
    //这个home-container这个div
    loadMore(homeContainerRef.current, props.getLessons)
    downRefresh(homeContainerRef.current, props.refreshLessons)
    lessonListRef.current();//ref.current可以存放任何东西，不一定是DOM
    homeContainerRef.current.addEventListener('scroll', throttle(lessonListRef.current, 30))
  }, [])
  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
        refreshLessons={props.refreshLessons}
      />
      <div className="refresh-loading">
        <Spin size="large" />
      </div>
      <div
        className="home-container"
        ref={homeContainerRef}
      >
          <HomeSliders
            sliders={props.sliders}
            getSliders={props.getSliders}
          />
          <LessonList
            lessons={props.lessons}
            getLessons={props.getLessons}
            homeContainerRef={homeContainerRef}
            ref={lessonListRef}
          />
      </div>
    </>
  )
}

const mapStateToProps = (state) => state.home;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
