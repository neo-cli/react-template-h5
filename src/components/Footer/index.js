import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from "antd";
import './index.less';

function Footer(props) {
  if (props.location.pathname === '/cart') {
    return null;
  }
  return (
    <footer>
      <NavLink exact to="/">
        <HomeOutlined style={{ fontSize: '24px' }}/>
        <span>首页</span>
      </NavLink>
      <NavLink to="/cart">
        <ShoppingCartOutlined style={{ fontSize: '24px' }}/>
        <Badge count={1}>
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
