import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class UserUpdate extends Component {
  constructor(props){
    super(props)
    this.state={
      visible: false
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

   onFinish = values => {
    console.log('Success:', values);
  };

   onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  render() {
    return (
      <div>
        <div type="primary" onClick={this.showModal}>
          修改信息
        </div>
        <Modal
          title="个人信息修改"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            {...layout}
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
}

export default UserUpdate;
