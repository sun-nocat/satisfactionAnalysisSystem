
import React, { useState, useEffect } from 'react';
import { Result, Button } from 'antd';


function LastContent (props) {

    return (
      <Result
      status="success"
      title="提交成功"
      subTitle="数据提交成功，稍后将会受到运行成功或失败的通知，可在【模型处理-模型管理】中查看运行结果"
      // extra={[
      //   <Button type="primary" key="console">
      //     Go Console
      //   </Button>,
      //   <Button key="buy">Buy Again</Button>,
      // ]}
    />
    );
  }

export default LastContent;