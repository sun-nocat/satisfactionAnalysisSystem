
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { connect } from 'dva';
const { Option } = Select;


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function InitMModuleValue (props) {

  // antd4 的 from 对象
  const [form] = Form.useForm();

  const onValuesChange = (e) =>{
    props.dispatch({type: 'model/onValueChange', payload: e})
  }

  useEffect(() => {
    // 显示输入框默认字段
    form.setFieldsValue({
      lam: props.modelData.lam,
    });
}, [props.modelData,form]);

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
  }

export default InitMModuleValue;
