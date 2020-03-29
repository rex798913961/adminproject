import React,{Component} from 'react';
import {HashRouter,Route,Redirect} from 'react-router-dom'
import Admin from './pages/Admin'
import Login from './pages/Login'
import User from './pages/User'
import Employee from './pages/Employee/EmployeeInfo'
import AddEmployeeInfo from './pages/Employee/AddEmployeeInfo'
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
               <Route path='/admin/employee' component={Employee}></Route>
               <Route path='/admin/addEmployee' component={AddEmployeeInfo}></Route>

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
