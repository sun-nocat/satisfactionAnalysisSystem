import React from 'react';
import { connect } from 'dva';
import MainPage from './MainPage';
import { routerRedux } from 'dva/router';


/**
 * 系统主页
 */
function IndexPage(props) {
  const { user } = props;

  /**
   * 进入主页时获取用户信息，用户权限控制
   */
  if (Object.keys(user).length === 0) {
    props.dispatch({
      type: "global/fetchUserInfo",
      payload: '123'
    })
  }

  return (
    <div style={{height: '100%'}}>
      <MainPage user={user} {...props}/>
    </div>
  );
}

IndexPage.propTypes = {

};

export default connect((state)=> {
  return {
    user: state.global.user
  }
})(IndexPage);
