import { Layout, Menu, Avatar, Dropdown } from 'antd';
import classNames from 'classnames'
import React from 'react'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DashboardOutlined,
  ToolOutlined,
  TeamOutlined 
} from '@ant-design/icons';
import UserUpdate from '../../components/UserUpdate'

import styles from './index.css'

const { Header, Sider, Content } = Layout;


class MainPage extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  // 登出
  logout = () => {
    console.log('logout')
    this.props.dispatch({type: 'login/logout'})
  }

  // 修改信息
  changeMsg = () => {

  }

  renderMenu(){
    return (
      <Menu>
      <Menu.Item onClick={this.changeMsg}>
        <UserUpdate/>
      </Menu.Item>
      <Menu.Item onClick={this.logout}>
          退出登录
      </Menu.Item>
    </Menu>
    )
  }

  render() {
    const { collapsed } = this.state;
    const { name } = this.props.user;
    const color = '#f56a00';
    
    let logoClass = classNames({
      [styles.logo]: true,
      [styles.hide]: collapsed,
      [styles.show]: !collapsed
    })
    
    return (
      <Layout style={{height: '100%'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={logoClass} >
            满意度分析平台
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
            <DashboardOutlined />
              <span>总览</span>
            </Menu.Item>
            <Menu.Item key="2">
            <UserOutlined />
              <span>用户管理</span>
            </Menu.Item>
            <Menu.Item key="3">
            <ToolOutlined />        
              <span>技术支持</span>
            </Menu.Item>
            <Menu.Item key="4">
            <TeamOutlined />            
              <span>关于</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#fff' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            <Dropdown overlay={this.renderMenu()} className={styles.dropdown}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Avatar
                  style={{
                    backgroundColor: color,
                    verticalAlign: 'middle',
                    margin: 13,
                  }}
                  size="large"
                  >
                  {name}  
                </Avatar>      
                  {/* <DownOutlined /> */}
                </a>
              </Dropdown>

          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainPage;