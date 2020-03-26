import React,{Component} from 'react';

import { Layout} from 'antd';
import SlideNav from '../../component/SlideNav'
const { Header, Content, Footer, Sider } = Layout;


class Admin extends Component{
  render(){
    return(
        <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
         <SlideNav></SlideNav>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            这是管理页面
            {/* 使用this.props.children渲染APP.js传来的需要渲染的组件 */}
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin;