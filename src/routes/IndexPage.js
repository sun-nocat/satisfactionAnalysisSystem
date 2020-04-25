import React from 'react';
import { connect } from 'dva';
import MainPage from './MainPage';
import { routerRedux } from 'dva/router';


/**
 * 系统主页
 */
function IndexPage(props) {
  const { user } = props;

  if (Object.keys(user).length === 0) {
    console.log('ok')
    props.dispatch(routerRedux.push('/login'));
  }

  return (
    <div style={{height: '100%'}}>
      <MainPage user={user}/>
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
