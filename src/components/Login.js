import { Form, Input, Button, Card } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

const loginTitle = (
  <div>
    满意度分析平台
  </div>
)

/**
 * 登录组件
 */
function Login (props) {

  const onFinish = values => {
    props.dispatch({
      type: 'user/submit',
      payload: values,
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }; 

  return (
    <Card style={{ width: 300 }} title={loginTitle}>
      <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="账号"
        name="username"
        rules={[{ required: true, message: '请输入正确的账号' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入正确的密码' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
          登录
        </Button>
      </Form.Item>
    </Form>
  </Card>
  );
};

export default Login;