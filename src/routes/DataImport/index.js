import React, { useState, useEffect } from 'react';
import { 
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Modal,
  message,
} from 'antd';
import { connect } from 'dva';

import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// 上传成功之后的提示
function successAlert() {
  let secondsToGo = 5;
  const modal = Modal.success({
    title: '数据导入并处理成功',
    content: `接下来您将可以在使用您导入后的数据，此对话框在 ${secondsToGo} 秒后关闭.`,
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `接下来您将可以在使用您导入后的数据，此对话框在 ${secondsToGo} 秒后关闭.`,
    });
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
}


function DataImport (props) {

  // antd4 的 from 对象
  const [form] = Form.useForm();


  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  const handleOk = e => {
    // 触发表单校验
    form.validateFields().then((data)=>{
      // 表单校验成功，可以提交
      console.log(data)
      new Promise((resolve,reject)=>{
        props.dispatch({type: 'data/importData', payload: {
          data,
          resolve,
          reject
        }})
      }).then(()=>{
        successAlert()
        form.resetFields()
        // setVisible(false)
      }).catch(()=>{
        message.error('更新失败！')
      })
    }).catch((error)=>{
      console.log('校验不通过')
      console.log(error)
    })
  };

  useEffect(() => {
    // 显示输入框默认字段
    form.setFieldsValue({
        score_obj: `{"A":  5, "B":  4, "C": 3, "D": 2}`,
    });
}, [props.user, form]);

    return (
      <div>
          <Form
            {...layout}
            form={form}
            name="userUpdate"
            style={{ width: '60%', marginLeft: '15%'}}
          >

            {/* 展示名（唯一标识） */}
            <Form.Item
              label="展示名"
              name="displayName"
              rules={[{ required: true, message: '展示名作为标识，必须存在' }]}
            >
              <Input />
            </Form.Item>

             {/* 数据文件 */}
            <Form.Item label="数据文件" rules={[{ required: true }]}>
              <Form.Item name="dataFile" valuePropName="fileList"  getValueFromEvent={normFile} noStyle>
                <Upload.Dragger name="files" action="/dataImport">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">点击或者拖拽文件到此区域</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>

            {/* 选项和分值的对应关系 */}
            <Form.Item name="score_obj" label="选项和分值的对应关系" rules={[{ required: true }]}>
              <Input.TextArea placeholder={`{ "A": 5, "B": 4, "C": 3, "D": 2 }`} />
            </Form.Item>

            {/* 表头所占单元格 */}
            <Form.Item label="表头所占单元格" style={{ marginBottom: 0 }}>
              <Form.Item
                name="titleRangeStart"
                rules={[{ required: true, message: '必填项' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="开始单元格地址" />
              </Form.Item>
              <Form.Item
                name="titleRangeEnd"
                rules={[{ required: true, message: '必填项' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="结束单元格地址" />
              </Form.Item>
            </Form.Item>


            {/* 选项所占单元格 */}
            <Form.Item label="选项所占单元格" style={{ marginBottom: 0 }}>
              <Form.Item
                name="chooseRangeStart"
                rules={[{ required: true, message: '必填项' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="开始单元格地址" />
              </Form.Item>
              <Form.Item
                name="chooseRangeEnd"
                rules={[{ required: true, message: '必填项' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="结束单元格地址" />
              </Form.Item>
            </Form.Item>


            {/* 外生指标所占单元格 */}
            <Form.Item label="外生指标所占单元格" style={{ marginBottom: 0 }}>
              <Form.Item
                name="xRangeStart"
                rules={[{ required: true, message: '必填项' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="开始单元格地址" />
              </Form.Item>
              <Form.Item
                name="xRangeEnd"
                rules={[{ required: true, message: '必填项' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="结束单元格地址" />
              </Form.Item>
            </Form.Item>

               {/* 外生指标所占单元格 */}
              <Form.Item label="内生指标所占单元格" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="yRangeStart"
                  rules={[{ required: true, message: '必填项' }]}
                  style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                  <Input placeholder="开始单元格地址" />
                </Form.Item>
                <Form.Item
                  name="yRangeEnd"
                  rules={[{ required: true, message: '必填项' }]}
                  style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                  <Input placeholder="结束单元格地址" />
                </Form.Item>
              </Form.Item>

          </Form>
          <Button type="primary" style={{width: '150px', position: 'relative', left: '30%'}} onClick={handleOk}>
                  提交
           </Button>
      </div>
    );
  }

export default connect((state)=>{
  return {
    user: state.global.user,
  }
})(DataImport);
