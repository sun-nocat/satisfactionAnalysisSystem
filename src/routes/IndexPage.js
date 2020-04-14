import React from 'react';
import { connect } from 'dva';
import Login from '../components/Login'
import styles from './IndexPage.css';

function IndexPage() {


  return (
    <div className={styles.normal}>
      <div className={styles.login}>
        <Login/>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
