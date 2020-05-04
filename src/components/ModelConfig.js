
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { connect } from 'dva';
const { Option } = Select;


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function ModelConfig (props) {

  // antd4 的 from 对象
  const [form] = Form.useForm();

  const onGenderChange = (e) =>{
    console.log(e)
  }

  const onValuesChange = (e) =>{
    props.dispatch({type: 'model/onValueChange', payload: e})
  }

  useEffect(() => {
    // 显示输入框默认字段
    form.setFieldsValue({
      method: props.modelData.method,
      step: props.modelData.step,
      max_iter: props.modelData.max_iter,
      rdd: props.modelData.rdd,
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
            <Form.Item name="method" label="系数估计方法" rules={[{ required: true }]}>
              <Select
                placeholder="请选择模型使用的数据源"
                onChange={onGenderChange}
              >
                <Option value="ml">极大似然法</Option>
                <Option value="uls">最小二乘法</Option>
                <Option value="gls">广义最小二乘法</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="梯度下降的步长"
              name="step"
              rules={[{ required: true, message: '请输入梯度下降的步长' }]}
            >
              <InputNumber placeholder="0.01" />
            </Form.Item>
            <Form.Item
              label="最大迭代次数"
              name="max_iter"
              rules={[{ required: true, message: '请输入最大迭代次数' }]}
            >
              <InputNumber min={1} max={10000} placeholder="10000" />
            </Form.Item>
            <Form.Item
              label="参数估计精度"
              name="rdd"
              rules={[{ required: true, message: '请输入参数估计精度' }]}
            >
              <InputNumber min={1} max={8} placeholder="3" />
            </Form.Item>
          </Form>
      </div>
    );
  }

export default ModelConfig;
