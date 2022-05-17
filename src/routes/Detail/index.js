import React, { useState, useEffect, useCallback }from "react";
import Nav from "@/components/Nav";
import { connect } from "react-redux";
import { Card, Button } from "antd";
import actions from '@/store/actions/cart';
import { getLesson } from '@/api/home';
import './index.less';

function Detail(props) {
  let [lesson, setLesson] = useState({})
  useEffect(() => {
    (async function () {
      let lesson = props.location.state;
      // 如果是从课程列表跳转过来的，是有state，如果是刷新的，就没有state
      if (!lesson) { //如果没有传lesson过来的话，我需要亲自调接口去课程详情,参数就是课程ID
        let result = await getLesson(props.match.params.id);
        if (result.code === 0) lesson = result.data;
      }
      setLesson(lesson);
    })()
  }, [])
  const addCartItem = useCallback((lesson) => {
    let cover = document.querySelector('.ant-card-cover');
    let coverWidth = cover.offsetWidth;//购物车图标宽度
    let coverHeight = cover.offsetHeight;//购物车图标高度
    let coverLeft = cover.getBoundingClientRect().left;//距离左边的距离
    let coverTop = cover.getBoundingClientRect().top;// 顶部距离


    let cart = document.querySelector('a .anticon.anticon-shopping-cart');
    let cartWidth = cart.offsetWidth;//购物车图标宽度
    let cartHeight = cart.offsetHeight;//购物车图标高度
    let cartRight = cart.getBoundingClientRect().right;//右连载距离左边的距离
    let cartBottom = cart.getBoundingClientRect().bottom;// 底部距离顶部距离
    let clonedCover = cover.cloneNode(true);

    clonedCover.style.cssText = (
      `
        z-index:1000;
        opacity:.8;
        position:fixed;
        width:${coverWidth}px;
        height:${coverHeight}px;
        top:${coverTop}px;
        left:${coverLeft}px;
        transition: all 2s ease-in-out;
      `
    )
    document.body.appendChild(clonedCover);
    setTimeout(() => {
        clonedCover.style.left = `${cartRight - cartWidth / 2}px`;
        clonedCover.style.top = `${cartBottom - cartHeight / 2}px`;
        clonedCover.style.width = '0px';
        clonedCover.style.height = '0px';
        clonedCover.style.opacity = '.5';
    }, 0);
    setTimeout(() => {
      clonedCover.parentNode.removeChild(clonedCover);
    }, 2000);
    props.addCartItem(lesson);
}, [])
  return (
    <>
      <Nav history={props.history}>课程详情</Nav>
      <Card
        hoverable
        style={{ width: '100%' }}
        cover={<img src={lesson.avatar} />}
      >
        <Card.Meta
          title={lesson.coursename}
          description={
            <>
              <p>{`价格: ￥${lesson.price}元`}</p>
              <p>
                  <Button
                    className="add-cart"
                    icon="shopping-cart"
                    onClick={() => addCartItem(lesson)}
                  >
                    加入购物车
                  </Button>
              </p>
            </>
          }
        />
      </Card>
    </>
  )
}


export default connect((state) => state, actions)(Detail)
