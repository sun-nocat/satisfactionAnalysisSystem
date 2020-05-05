import { Steps, Button, message, notification  } from 'antd';
import React from 'react'
import SelectDataSource from '../../components/SelectDataSource'
import InitMModuleValue from '../../components/InitMModuleValue'
import ModelConfig from '../../components/ModelConfig'
import SubmitModel from '../../components/SubmitModel'
import LastContent from '../../components/LastContent'
import {connect} from 'dva'
import {SmileOutlined} from '@ant-design/icons'

const { Step } = Steps;



class MeasurementModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  submit = () => {
    new Promise((resolve, reject) => {
      this.next()
      this.props.dispatch({type: 'model/submit', payload: { resolve, reject, type: 'measurement' }})
    }).then(()=>{
      notification.open({
        message: '提交成功',
        duration: null,
        description:
          '模型配置提交成功，请在【模型处理-模型管理】中查看运行结果！',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    }).catch(()=>{
      notification.open({
        message: '提交失败',
        description:
          '请检查配置是否错误',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    })
  }
  

  render() {
    const { current } = this.state;
    const steps = [
      {
        title: '选择数据源',
        content: <SelectDataSource {...this.props} modelType="measurement"/>,
      },
      {
        title: '定义载荷初值',
        content: <InitMModuleValue {...this.props} modelType="measurement"/>,
      },
      {
        title: '模型配置',
        content: <ModelConfig {...this.props} modelType="measurement"/>,
      },
      {
        title: '提交',
        content: <SubmitModel {...this.props} modelType="measurement"/>,
      },
      {
        title: '完成',
        content: <LastContent {...this.props} modelType="measurement"/>,
      },
    ];
    return (
      <div style={{
        width: '80%',
        margin: '0 auto'
      }}>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action" style={{textAlign: 'center', marginBottom: '50px'}}>
        {current > 0 && current!==4 && (
            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
          {current === steps.length - 2 && (
            <Button type="primary" onClick={this.submit}>
              提交
            </Button>
          )}

                {current < steps.length - 2 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default connect((state)=>{
  return {
    modelData: state.model.formInfo,
    dataList: state.data.dataList,
  }
})(MeasurementModel);
