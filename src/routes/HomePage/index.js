import React, {useEffect} from 'react';
import { connect } from 'dva';
import { Statistic, Row, Col, Button,  Steps, Card  } from 'antd';
import styles from './index.css';
import imgUrl from './../../assets/model.jpg'
const { Step } = Steps;
const { Meta } = Card;


function HomePage(props) {

  useEffect(() => {
    props.dispatch({type: 'data/dataList', payload: {}})
    props.dispatch({type: 'model/modelList', payload: {}})

    return function cleanup() {
      // props.dispatch({type: 'data/clearDataList', payload: {}})
    };
  }, []);

  const models =Object.keys(props.modelList).length

  let datas = 0

  Object.values(props.modelList).forEach((item)=>{
    datas = datas + item.length
  })

  return (
    <div>
      <Row gutter={16}  style={{    position: 'relative', 
      left: '28%',
      top: '50px'}}>
        <Col span={12}>
          <Statistic title="共计数据源" value={models} />
        </Col>
        <Col span={12}>
          <Statistic title="共计模型数" value={datas} />
        </Col>
      </Row>

      <Card
    // hoverable
    style={{     width: '450px',
      position: 'absolute',
      top: '280px',
      left: '685px',
      height: '400px' }}
    cover={<img alt="example" src={imgUrl} />}
  >
  </Card>
      <Steps progressDot current={5} direction="vertical" >
        <Step title="数据导入" description="用于导入和加工初始数据，支持从Excel导入" />
        <Step title="数据管理" description="对导入的数据进行管理，可查看和删除标准化处理后的数据" />
        <Step title="测量模型" description="基于验证性因子分析的测量模型，用于研究是潜变量（因子）和显变量（测量指标）的关系" />
        <Step title="结构方程模型" description="基于结构方程的因子分析，用于研究潜变量之间或者说因子之间关系" />
        <Step title="模型管理" description="查看和删除模型执行的结果"/>
      </Steps>
    </div>

  );
}

export default connect((state)=>{
  return {
    dataList: state.data.dataList,
    modelList: state.model.modelList,
  }
})(HomePage);
