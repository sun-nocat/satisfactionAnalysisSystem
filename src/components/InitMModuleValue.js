
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { connect } from 'dva';
const { Option } = Select;


const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};

function InitMModuleValue (props) {

  // antd4 的 from 对象
  const [form] = Form.useForm();

  const onValuesChange = (e) =>{
    if (props.modelType == 'measurement') {
      props.dispatch({type: 'model/onValueChange', payload: e})
    }else{
      props.dispatch({type: 'model/onValueChange2', payload: e})
    }
  }

  useEffect(() => {
    // 显示输入框默认字段
    if(props.modelType == 'measurement') {
      form.setFieldsValue({
        lam: props.modelData.lam,
      });
    } else{
      form.setFieldsValue({
        x: props.modelData.x,
        y: props.modelData.y,
        lam_x: props.modelData.lam_x,
        lam_y: props.modelData.lam_y,
        beta: props.modelData.beta,
        gamma: props.modelData.gamma,
      });
    }

}, [props.modelData,form]);

if(props.modelType == 'measurement') {
  return (
    <div style={{
      width: '80%',
      marginLeft: '5%',
      padding: 100}}>
        <Form
          {...layout}
          form={form}
          name="userUpdate"
          onValuesChange={onValuesChange}
        >
          <Form.Item
            label="因子载荷初始值"
            name="lam"
            rules={[{ required: true, message: '请输入因子载荷初始值' }]}
          >
            <Input.TextArea rows={8} placeholder={`[
  [1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1],
]`}/>
          </Form.Item>
        </Form>
    </div>
  );
} else {
  return (
    <div style={{
      width: '80%',
      marginLeft: '5%',
      padding: 100}}>
        <Form
          {...layout}
          form={form}
          name="userUpdate"
          onValuesChange={onValuesChange}
        >
            <Form.Item
              label="内源变量在样本中的维度所占列数集合"
              name="x"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>

            <Form.Item
              label="内源变量在样本中的维度所占列数集合"
              name="y"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input.TextArea  rows={2}/>
            </Form.Item>

          <Form.Item
            label="内源变量的因子载荷初值"
            name="lam_x"
            rules={[{ required: true, message: '请输入内源变量的因子载荷初值' }]}
          >
            <Input.TextArea rows={8} placeholder={`[
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1],
]`}/>
          </Form.Item>
          <Form.Item
            label="外源变量的因子载荷初值"
            name="lam_y"
            rules={[{ required: true, message: '请输入外源变量的因子载荷初值' }]}
          >
            <Input.TextArea rows={8} placeholder={`[
    [1, 1, 1, 1, 1, 1],
]`}/>
          </Form.Item>
          <Form.Item
            label="外源变量的系数初值"
            name="beta"
            rules={[{ required: true, message: '请输入外源变量的系数初值' }]}
          >
            <Input.TextArea rows={8} placeholder={`[
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]`}/>
          </Form.Item>
          <Form.Item
            label="内源变量的系数初值"
            name="gamma"
            rules={[{ required: true, message: '请输入内源变量的系数初值' }]}
          >
            <Input.TextArea rows={8} placeholder={`[
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]`}/>
          </Form.Item>
        </Form>
    </div>
  );
}
  }

export default InitMModuleValue;
