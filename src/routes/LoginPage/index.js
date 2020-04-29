import React from 'react';
import { connect } from 'dva';
import Login from '../../components/Login'
import styles from './index.css';

function LoginPage(props) {

  return (
    <div className={styles.normal}>
      <div className={styles.login}>
        <Login dispatch={props.dispatch}/>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
};

export default connect((state)=>{
  return {
    isLogin: state.user.isLogin
  }
})(LoginPage);
