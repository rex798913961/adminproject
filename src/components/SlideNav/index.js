import React,{Component,Fragment} from 'react';
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
    this.setState({
      current: e.key,
    });
    let {path} = e.item.props 
    this.props.history.replace(path)
  };
  renderItem(list){
    return list.map((item,index)=>{
      return (<Menu.Item key={item.key} path={item.path}>{item.title}</Menu.Item>)
      
    })
  }
  renderNAV(list){
    return list.map((item,index)=>{
      return(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
            }
            path={item.path}
          >
            {item.children?this.renderItem(item.children):''}
          </SubMenu>
      )
    })
  }
  render(){
    return(
        <div>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 200 }}
          defaultOpenKeys={['2']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          {this.renderNAV(menulist)}
        </Menu>
        </div>
    )
  }
}

export default withRouter(SlideNav);