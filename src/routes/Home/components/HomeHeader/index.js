import React, { useState } from 'react';
import './index.less';
import { BarsOutlined} from '@ant-design/icons'
import classnames from 'classnames';
import { Transition } from 'react-transition-group';
import logo from '@/assets/img/logo.png';


const duration = 1000;
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};


function HomeHeader(props) {
  let [isMenuVisible, setIsMenuVisible] = useState(false)
  const setCurrentCategory = (event) => {
    let target = event.target;
    let category = target.dataset.category;
    // props.setCurrentCategory(category);
    // props.refreshLessons();
    setIsMenuVisible(false);
  }
  return (
    <header className="home-header">
      <div className="logo-header">
        <img src={logo}/>
        <BarsOutlined style={{ fontSize: '32px' }} onClick={() => setIsMenuVisible(!isMenuVisible)}/>
      </div>
      <Transition in={isMenuVisible} timeout={duration}>
        {
          (state) => (
            <ul 
              className="category"
              onClick={setCurrentCategory}
              style={{ ...defaultStyle, ...transitionStyles[state] }}
            >
              <li data-category="all" className={classnames({ active: props.currentCategory === 'all' })}>全部</li>
              <li data-category="react" className={classnames({ active: props.currentCategory === 'react' })}>React</li>
              <li data-category="vue" className={classnames({ active: props.currentCategory === 'vue' })}>Vue</li>
            </ul>
          )
        }
      </Transition>
    </header>
  )
}

export default HomeHeader;