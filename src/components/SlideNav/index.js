import React,{Component} from 'react';
// 在 handleClick中因为没有路由对象，需要使用withRouter处理
import {withRouter} from 'react-router-dom'
import { Menu ,Icon} from 'antd';
import menulist from './menuList'
const { SubMenu } = Menu;


class SlideNav extends Component{
  state = {
      theme: 'dark',
      current: '1',
  };
  handleClick = e => {
    let {path} = e.item.props 
    this.setState({
      current: path,
    });
    this.props.history.replace(path)
  };
  renderItem(data){
    return data.map((item,index)=>{
      if(item.children){
        return(
          <SubMenu key={item.key} title={(()=>{
            return(
              <span>
                {item.icon?<Icon type={item.icon} />:''}
                {item.title}
              </span>
            )
          })()}>
            {/* 如果里面还有2级 将渲染的方法在调用一遍 */}
            {this.renderItem(item.children)}
          </SubMenu>
        )
      }else{
        return(
        <Menu.Item key={item.key} path={item.path}>
          {item.icon?<Icon type={item.icon} />:''}
          {item.title}
        </Menu.Item>
        )
      }
    })
  }
  render(){
    const path = this.props.location.pathname
    return(
    <Menu onClick={this.handleClick.bind(this)} style={{ width: 200 }} mode="inline" theme='dark' selectedKeys={[path]}>
      {this.renderItem(menulist)}
    </Menu>
    )
  }
}

export default withRouter(SlideNav);