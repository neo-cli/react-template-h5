import React from 'react';
import './index.less';
import {
  LeftOutlined
} from '@ant-design/icons';

function Nav(props) {
  console.log(props, 'vv')
  return (
      <header className="nav-header">
          <div className="nav-header-icon">
            <LeftOutlined style={{ fontSize: '24px' }} onClick={() => props.history.goBack()} />
          </div>
          {props.children}
      </header>
  )
}
export default Nav;