import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from "antd";
import './index.less';
import store from '../../store';
function Footer(props) {
  if (props.location.pathname === '/cart') {
    return null;
  }
  const number = store.getState().cart.length
  return (
    <footer>
      <NavLink exact to="/">
        <HomeOutlined style={{ fontSize: '24px' }}/>
        <span>首页</span>
      </NavLink>
      <NavLink to="/cart">
        <ShoppingCartOutlined style={{ fontSize: '24px' }}/>
        <Badge count={number}>
          <span>购物车</span>
        </Badge>
      </NavLink>
      <NavLink to="/profile">
        <UserOutlined style={{ fontSize: '24px' }}/>
        <span>个人中心</span>
      </NavLink>
    </footer>
  )
}

export default withRouter(Footer)
