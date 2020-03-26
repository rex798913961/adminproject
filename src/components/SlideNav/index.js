import React,{Component} from 'react';

import { Menu ,Icon} from 'antd';

const { SubMenu } = Menu;


class SlideNav extends Component{
    state = {
        theme: 'dark',
        current: '1',
      };
    
      handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };
  render(){
    return(
        <div>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
              {/* <UserOutlined /> */}
              <Icon type="home" />
                <span>用户管理</span>
              </span>
            }
          >
            <Menu.Item key="1">添加用户</Menu.Item>
          </SubMenu>
        </Menu>
        </div>
    )
  }
}

export default SlideNav;