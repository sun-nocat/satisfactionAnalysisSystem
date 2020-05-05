import React, { useState, useEffect } from 'react';
import { Table, Modal, Divider, Descriptions } from 'antd';
import { connect } from 'dva'

function ModelInfoModal(props) {


  useEffect(() => {

    return function cleanup() {
    };
  }, []);



  const handleOk = () =>{
    console.log('handleOk')
  }

  const { modelInfo } = props;
  if (modelInfo.type === 'structural') {
    return (
      <div>
          <Modal
            title="详情"
            visible={props.modelVisible}
            onOk={handleOk}
            onCancel={()=>props.dispatch({type: 'model/visible', payload: false})}
            width='80%'
            style={{position: 'relative', top: '15px'}}
          >
            <Descriptions bordered title="模型信息">
              <Descriptions.Item label="名称">
                {modelInfo.name}
                </Descriptions.Item>
              <Descriptions.Item label="类型">
                {modelInfo.type == 'measurement' ? '测量方程' :'结构方程'}
                </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {modelInfo.time}
              </Descriptions.Item>
  
              <Descriptions.Item label="内源变量因子载荷" span={3} style={{whiteSpace:'pre'}}>
                {modelInfo.lam_x}
              </Descriptions.Item>
              <Descriptions.Item label="外源变量因子载荷" span={3} style={{whiteSpace:'pre'}}>
                {modelInfo.lam_y}
              </Descriptions.Item>
              <Descriptions.Item label="内源潜变量协方差矩阵" span={3} style={{whiteSpace:'pre'}}>
                {modelInfo.phi_x}
              </Descriptions.Item>
              <Descriptions.Item label="路径方程外源变量系数" span={3} style={{whiteSpace:'pre'}}>
                {modelInfo.beta}
              </Descriptions.Item>         
              <Descriptions.Item label="路径方程内源变量系数" span={3} style={{whiteSpace:'pre'}}>
                {modelInfo.gamma}
              </Descriptions.Item>        
               <Descriptions.Item label="路径方程误差方差" span={3} style={{whiteSpace:'pre'}}>
                {modelInfo.var_e}
              </Descriptions.Item>         
              <Descriptions.Item label="内源变量误差方差" span={3} style={{whiteSpace:'pre'}}>
                {modelInfo.var_e_x}
              </Descriptions.Item>
              <Descriptions.Item label="外源变量误差方差" span={3} style={{whiteSpace:'pre'}}>
                {modelInfo.var_e_y}
              </Descriptions.Item>
            </Descriptions>
    
          </Modal>
      </div>
    )
  } else if(modelInfo.type === 'measurement') {
    return (
      <div>
          <Modal
            title="详情"
            visible={props.modelVisible}
            onOk={handleOk}
            onCancel={()=>props.dispatch({type: 'model/visible', payload: false})}
            width='80%'
            style={{position: 'relative', top: '15px'}}
          >
            <Descriptions bordered title="模型信息">
              <Descriptions.Item label="名称">
                {modelInfo.name}
                </Descriptions.Item>
              <Descriptions.Item label="类型">
                {modelInfo.type == 'measurement' ? '测量方程' :'结构方程'}
                </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {modelInfo.time}
              </Descriptions.Item>
  
              <Descriptions.Item label="误差方差" span={3} style={{whiteSpace:'pre'}}>
                {modelInfo.error_var_e}
              </Descriptions.Item>
              <Descriptions.Item label="因子载荷" span={3} style={{whiteSpace:'pre'}}>
                {modelInfo.lam}
              </Descriptions.Item>
              <Descriptions.Item label="潜变量协方差矩阵" span={3} style={{whiteSpace:'pre'}}>
                {modelInfo.phi}
              </Descriptions.Item>
            </Descriptions>
    
          </Modal>
      </div>
    )

  } else {
    return null;
  }



}

export default connect((state)=>{
  return {
    // modelInfo: state.model.modelInfo,
  }
})(ModelInfoModal);
