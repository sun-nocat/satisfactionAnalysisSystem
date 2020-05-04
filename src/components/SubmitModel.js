
import React, { useState, useEffect } from 'react';
import { Result } from 'antd';


function LastContent (props) {

    return (
      <div style={{
        width: '80%',
        margin: 'auto',
        padding: 100}}>
      <Result
        title="你已经配置完成一个模型"
        subTitle="点击提交将进行处理，稍后可在【模型管理】中查看运行结果"
      />
      </div>
    );
  }

export default LastContent;
