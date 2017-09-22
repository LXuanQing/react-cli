import { combineReducers } from 'redux';
import { home } from './home';

//注册reducer，每个自定义的reducer都要来这里注册！！！不注册会报错。
const rootReducer = combineReducers({
  home, //首页相关  connect里state 就有这个属性，是个对象，这个对象又有两个属性a和b
});

export default rootReducer;
