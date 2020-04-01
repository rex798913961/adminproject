import React,{Component} from 'react';
import {HashRouter,Route,Redirect} from 'react-router-dom'
import Admin from './pages/Admin'
import Login from './pages/Login'
import User from './pages/User'
import GoodsInfo from "./pages/Goods/GoodList/index";
import GoodsAdd from './pages/Goods/GoodAdd/index'
import GoodsUpdate from './pages/Goods/GoodsUpdate/index'
class App extends Component{
  render(){
    return(
      <HashRouter>
        {/* 控制地址栏改变 */}
        {/* 登录和管理页为同一级 */}
        <Route path='/login' component={Login}></Route>
        <Route path='/admin' render={()=>{
          return(
            // 需要使用嵌套路由实现管理页面内的跳转
            <Admin>
               <Route path='/admin/user' component={User}></Route>
               <Route path='/admin/goodsInfo' component={GoodsInfo}></Route>
               <Route path='/admin/goodsAdd' component={GoodsAdd}></Route>
               <Route path='/admin/goodsUpdate/:id' component={GoodsUpdate}></Route>
            </Admin>
          )
        }}></Route>
        {/* 重定向 */}
        <Redirect from="/" to="/login" />
      </HashRouter>
    )
  }
}

export default App;
