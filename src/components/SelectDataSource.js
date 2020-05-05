
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { connect } from 'dva';
const { Option } = Select;


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

function SelectDataSource (props) {

  // antd4 的 from 对象
  const [form] = Form.useForm();

  const onGenderChange = (e) =>{
    console.log(e)
  }

  const onValuesChange = (e) =>{
    console.log('e',e)
    if (props.modelType == 'measurement') {
      props.dispatch({type: 'model/onValueChange', payload: e})
    } else{
      props.dispatch({type: 'model/onValueChange2', payload: e})
    }
  }


  useEffect(() => {
    // 显示输入框默认字段
    form.setFieldsValue({
        name: props.modelData.name,
        dataSource: props.modelData.dataSource,
    });
}, [props.modelData,form]);

  useEffect(() => {
    props.dispatch({type: 'data/dataList', payload: {}})

    return () => {
    };
  }, []);

    return (
      <div style={{
        width: '80%',
        marginLeft: '5%',
        marginBottom: '13%',
        padding: 100}}>
          <Form
            {...layout}
            form={form}
            name="userUpdate"
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="名称"
              name="name"
              rules={[{ required: true, message: '请输入名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="dataSource" label="数据源" rules={[{ required: true }]}>
              <Select
                placeholder="请选择模型使用的数据源"
                onChange={onGenderChange}
            >{ props.dataList &&
               props.dataList.map((item)=> <Option value={item.uid}>{item.displayName}</Option>)
              }
                
                {/* <Option value="female">female</Option>
                <Option value="other">other</Option> */}
              </Select>
            </Form.Item>
          </Form>
      </div>
    );
  }

export default SelectDataSource;
