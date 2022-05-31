import React, { useEffect } from 'react';
import './index.less';
import { Card, Button, Alert, Skeleton } from 'antd';
import { Link } from 'react-router-dom';

//如果我们想让一个组件强行刷新
function LessonList(props, lessonListRef) {
  /**
   * forceUpdate是模拟类组件的forceUpdate方法。函
   * 数组件没有forceUpdate方法，我又想让组件强行刷新
   */
  //const [_, forceUpdate] = useState(0);
  const [, forceUpdate] = React.useReducer(x=> x+2, 0);
  lessonListRef.current = forceUpdate
  useEffect(()=>{
    if(props.lessons.list.length === 0){//如果传过来的课程列表为空
      props.getLessons();//请求加载一次
    }
  },[]);
  //let start = 0;//开始真正渲染的起始索引 从它开始向下渲染3条数据。除此以外的卡片都用空的DIV撑开发
  let start =0,end=0;//主要是要计算起始索引和结束的索引
  let homeContainer = props.homeContainerRef.current;
  let remUnit = parseFloat(document.documentElement.style.fontSize);//真实的rem值
  let itemSize = (650 / 75) * remUnit;//每个条目的高度 rem的值 325
  let screenHeight= window.innerHeight - (222 / 75) * remUnit;//屏幕的高度 header+footer总高度
  if(homeContainer){
    const scrollTop = homeContainer.scrollTop;//获取容器向上卷去的高度
    start = Math.floor(scrollTop / itemSize);//要显示的条目的起始索引
    end = start + Math.floor(screenHeight / itemSize);//10
    start -=2,end +=2;//缓存的条目
    start  = start < 0 ? 0 : start;//如果少于0的就取0
    end = end > props.lessons.list.length ? props.lessons.list.length : end;//如果已经 大于最后一条了，取最后一条
  }
  //第一次的第1条到第12条
  let visibleList = props.lessons.list.map((item, index)=>({ ...item, index})).slice(start, end);
  let cardStyle = { position:'absolute', top: 0, left:0,width: '100%', height: itemSize };
  let bottomTop = props.lessons.list.length * itemSize;
  return (
    <section className="lesson-list">
      <h2>全部课程</h2>
      <Skeleton
        loading={props.lessons.loading && props.lessons.list.length == 0}
        active
        paragraph={{ rows: 8 }}
      >
        <div style={{position:'relative',width:'100%',height:`${props.lessons.list.length * itemSize}px`}}>
          {
            visibleList.map((lesson, index)=>(
                <Link
                  key={lesson.id}
                  to={{pathname:`/detail/${lesson.id}`, state:lesson}}
                  style={{...cardStyle, top:`${itemSize*lesson.index}px`}}
                  >
                    <Card
                      hoverable={true}
                      style={{width:'100%'}}
                      cover={<img src={lesson.avatar} loading="lazy"/>}
                    >
                      <Card.Meta
                        title={lesson.coursename}
                        description={`价格:¥${lesson.price}元`}
                      />
                    </Card>
                </Link>
            ))
          }
          {
            props.lessons.hasMore ?
            (<Button
                style={{textAlign:'center',top:`${bottomTop}px`}}
                onClick={props.getLessons}
                loading={props.lessons.loading}
                type="primary"
                block
              >
                {props.lessons.loading ? '': '加载更多'}</Button>) :
              (<Alert
                style={{textAlign:'center',top:`${bottomTop}px`}}
                message='我是有底线的'
                type='warning'
              />)
          }
        </div>
      </Skeleton>
    </section>
  )
}
export default React.forwardRef(LessonList);
