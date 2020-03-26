import React,{Component} from 'react';
import {HashRouter,Link,Route,Switch,Redirect} from 'react-router-dom'
import Admin from './pages/Admin'
import Login from './pages/Login'
import User from './pages/User'
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
            </Admin>
          )
        }}></Route>
      </HashRouter>
    )
  }
}

export default App;
