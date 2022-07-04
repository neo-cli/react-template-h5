import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect, matchPath } from 'react-router-dom';
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
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import history from '@/utils/history';
import { ConnectedRouter } from 'connected-react-router';
import SentryRRWeb from '@sentry/rrweb';

const routes = [
  {
    path: '/detail/:id'
  },
  { path: '/cart' },
  { path: '/profile' },
  { path: '/register' },
  { path: '/login' },
  { path: '/mine' }, { path: '/' }];
Sentry.init({
  dsn: "http://9210b9accaa849e4951353d49514125a@106.55.26.154:8588/3",
  integrations: [
    new BrowserTracing(
      {
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(history, routes, matchPath),
      }
    ),
    new SentryRRWeb({
      checkoutEveryNms: 10 * 1000, // 每10秒重新制作快照
      checkoutEveryNth: 200, // 每 200 个 event 重新制作快照
      maskAllInputs: false, // 将所有输入内容记录为 *
    }),
  ],
  release: 'pro@1.0.0',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
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
