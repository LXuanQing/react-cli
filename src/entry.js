import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import rootReducer from 'reducers';
import asyncComponent from './AsyncComponent'
import './app.less' //全局的css

import Home from 'containers/Home/home'
const User = asyncComponent(() => import(/* webpackChunkName: "user" */"./containers/user")) // 通过注释 设置输出的文件名师user.js config.js 必须设置chunkFilename

//解决移动端300毫秒延迟
var FastClick = require('fastclick');
FastClick.attach(document.body);

const middlewares = [];

const initialState = {}
const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route  path="/user" component={User} />
        </Switch>
    </Router>
    </Provider>,
    document.getElementById('root')
);



