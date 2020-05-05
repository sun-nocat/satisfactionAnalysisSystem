import React, { useState, useEffect } from "react";
import { Collapse,Tag, Table, Badge, Popover  } from 'antd';
import { connect } from 'dva'
import ModelInfoModal from '../../components/ModelInfoModal'

const { Panel } = Collapse;

function Title(displayName, time, uid, modelList){

  const item = modelList[String(uid)]
  let length = 0
  if (item){
    length = item.length
  }

  return <span>
    {displayName}
    <Tag color="orange" style={{float: "right", marginRight: '3%'}}>{time}</Tag>
    <Tag color="cyan" style={{float: "right"}}>{`共计${length}个模型`}</Tag>
  </span>
}
 
function ModelManage(props) {

  const callback = (key) => {
    console.log(key);
  }
  const [modelList, setModelList] = useState({});


  useEffect(() => {
    props.dispatch({type: 'data/dataList', payload: {}})
    props.dispatch({type: 'model/modelList', payload: {}})

    return () => {
      
    };
  }, []);

  useEffect(() => {
    setModelList(props.modelList)
    return () => {
      
    };
  }, [props.modelList]);


  const renderTable = (uid) => {



    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (item)=>{
          if (item == 'measurement') {
            return <Tag color="green">测量模型</Tag>
          } else{
            return <Tag color="blue">结构方程模型</Tag>
          }
        }
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        render: (item) => <Tag color="orange" >{item}</Tag>

      }, 
      {
        title: '状态',
        dataIndex: 'ready_a',
        key: 'ready_a',
        render: (item) =>item == "True" ? <Badge status="success" /> : <Badge status="error" />
      }, 
      {
        title: '日志',
        dataIndex: 'ready_b',
        key: 'ready_b',
        render: (item) =>{
          if (item) {
           return <Popover content={item} title="日志详情">
                  查看日志
              </Popover>
          }else
          return null;
        }
      }, 
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          if (text.ready_b) {
              return (
                <span>
                  <Popover content={text.ready_b} title="日志详情"  trigger="click">
                      <a style={{ marginRight: 16 }}>详情</a>
                  </Popover>
                  <a onClick={()=>props.dispatch({type: 'model/del', payload:{ mid: text.mid}})}>删除</a>
               </span>
              )
            } else {
              return (
                <span>
                  <a style={{ marginRight: 16 }} onClick={()=>{
                  props.dispatch({type: 'model/info', payload:{ mid: text.mid}})
                  props.dispatch({type: 'model/visible', payload: true})
                  }}>详情</a>
                  <a onClick={()=>props.dispatch({type: 'model/del', payload:{ mid: text.mid}})}>删除</a>
              </span>
              )
            }
        }
      }
    ]
    const dataSource = modelList[String(uid)]

    if(dataSource) {
      return <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ y: 350 }}/>
    }
    return null;
  }



  return (
    <div>
        <Collapse defaultActiveKey={['1']} onChange={callback}>
          {props.dataList && props.dataList.map((item)=>
            <Panel header={Title(item.displayName, item.time, item.uid, modelList)} key={item.uid}>
              {props.modelList && props.dataList && renderTable(item.uid)}
            </Panel>
          )}
        </Collapse>
      <ModelInfoModal modelInfo={props.modelInfo} dispatch={props.dispatch} modelVisible={props.modelVisible} />
    </div>

  )
}


export default connect((state)=>{
  return {
    dataList: state.data.dataList,
    modelList: state.model.modelList,
    modelInfo: state.model.modelInfo,
    modelVisible: state.model.modelVisible,
  }
})(ModelManage);