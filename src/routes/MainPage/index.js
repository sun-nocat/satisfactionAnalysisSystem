import { Layout, Menu, Avatar, Dropdown } from 'antd';
import classNames from 'classnames'
import React from 'react'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DashboardOutlined,
  ToolOutlined,
  TeamOutlined,
  MailOutlined,
  AreaChartOutlined,
  FunctionOutlined,
} from '@ant-design/icons';
import UserUpdate from '../../components/UserUpdate'
import { routerRedux } from 'dva/router';

import DataImport from '../DataImport/index'
import DataMange from '../DataManage/index'
import MeasurementModel from '../MeasurementModel/index'
import ModelManage from '../ModelManage/index'
import StructuralModel from '../StructuralModel/index'
import HomePage from '../HomePage/index'
import AboutPage from '../AboutPage/index'
import styles from './index.css'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


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
    this.props.dispatch({type: 'user/logout'})
  }

  // 修改信息
  changeMsg = () => {

  }

  renderMenu(){
    return (
      <Menu>
      {/* <Menu.Item onClick={this.changeMsg}>
      </Menu.Item> */}
      <Menu.Item onClick={this.logout}>
          退出登录
      </Menu.Item>
    </Menu>
    )
  }

  // 点击左侧选项
  menuOnClick = (e) =>{
    console.log(e)
    this.props.dispatch({
      type: 'global/updateKeyMsg', 
      payload: {
        key: e.key,
        keyPath: e.keyPath
    }})
    // onClick={()=>this.props.dispatch(routerRedux.push('/datapage'))}
  }


  // 根据用户选的menu,展示不同的组件
  getContent() {
    console.log('----', this.props.menuKey)
    let res = '';
    const { menuKey } = this.props;
    switch(menuKey){
      case '1': {
        res = <HomePage/>;
        break;
      }
      case '2': {
        res =<UserUpdate/>
        break;

      }
      case '4': {
        res =<AboutPage/>
        break;

      }
      case '5': {
        res = <DataImport />    
        break;
      }
      case '8': {
        res = <MeasurementModel />
        break;
      }
      case '9': {
        res = <StructuralModel />
        break;
      }
      case '10': {
        res = <ModelManage />
        break;
      }
      default : {
        res = <DataMange />;
      }
    }
    return res;
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.menuOnClick}>
            <Menu.Item key="1">
            <DashboardOutlined />
              <span>总览</span>
            </Menu.Item>
            <SubMenu key="sub1" icon={<AreaChartOutlined />} title="数据处理">
              <Menu.Item key="5">数据导入</Menu.Item>
              <Menu.Item key="6">数据管理</Menu.Item>
              {/* <Menu.Item key="7">数据分析</Menu.Item> */}
            </SubMenu>
            <SubMenu key="sub3" icon={<FunctionOutlined />} title="模型处理">
              <Menu.Item key="8">测量模型</Menu.Item>
              <Menu.Item key="9">结构方程模型</Menu.Item>
              <Menu.Item key="10">模型管理</Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
            <UserOutlined />
              <span>用户管理</span>
            </Menu.Item>
            {/* <Menu.Item key="3">
            <ToolOutlined />        
              <span>技术支持</span>
            </Menu.Item> */}
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
           {this.getContent()}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainPage;