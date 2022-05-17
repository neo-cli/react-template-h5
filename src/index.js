import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './assets/style/common.less';
import Home from './routes/Home';//routes路由组件 一个组件对应一个页面 页面组件
import Mine from './routes/Mine';
import Register from './routes/Register';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Detail from './routes/Detail';
import Cart from './routes/Cart';
import Footer from '@/components/Footer';
import 'antd/dist/antd.css';

import history from '@/utils/history';
import { ConnectedRouter } from 'connected-react-router';

ReactDOM.render(
  <Provider store={store}>
        <ConnectedRouter history={history}>
            <ConfigProvider locale={zh_CN}>
                <main className="main-container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/mine" exact component={Mine} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/detail/:id" exact component={Detail} />
                        <Route path="/cart" exact component={Cart} />
                    </Switch>
                </main>
                <Footer />
            </ConfigProvider>
        </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);