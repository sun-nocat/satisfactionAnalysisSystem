import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { connect } from 'dva';


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function UserUpdate (props) {

  const [visible, setVisible]  = useState(false);
  // antd4 的 from 对象
  const [form] = Form.useForm();


  const handleOk = e => {
    // 触发表单校验
    form.validateFields().then((data)=>{
      // 表单校验成功，可以提交
      console.log(data)
      new Promise((resolve,reject)=>{
        props.dispatch({type: 'user/userUpdate', payload: {
          data,
          resolve,
          reject
        }})
      }).then(()=>{
        message.success('更新成功！')
        setVisible(false)
      }).catch(()=>{
        message.error('更新失败！')
      })
    }).catch((error)=>{
      console.log(error)
    })
  };

  useEffect(() => {
    // 显示输入框默认字段
    form.setFieldsValue({
        username: props.user.username,
        name: props.user.name,
    });
}, [props.user, form]);

    return (
      <div>
        <div type="primary" onClick={()=>setVisible(true)}>
          修改信息
        </div>
        <Modal
          title="个人信息修改"
          visible={visible}
          onOk={handleOk}
          onCancel={()=>setVisible(false)}
        >
          <Form
            {...layout}
            form={form}
            name="userUpdate"
          >
            <Form.Item
              label="用户名"
              name="name"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="账号"
              name="username"
              rules={[{ required: true, message: '' }]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }

export default connect((state)=>{
  return {
    user: state.global.user,
  }
})(UserUpdate);
