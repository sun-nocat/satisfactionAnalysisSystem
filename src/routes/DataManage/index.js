import React, { useState, useEffect } from 'react';
import { Table, Modal, Divider, message } from 'antd';
import { connect } from 'dva'
import DataInfoTable from '../../components/DataInfoTable'
import { host } from '../../util'



function DataMange(props) {

  const [visible, setVisible] = useState(false)

  const { dataInfo } = props;


  useEffect(() => {
    props.dispatch({type: 'data/dataList', payload: {}})
    return function cleanup() {
      props.dispatch({type: 'data/clearDataList', payload: {}})
    };
  }, []);

  const handleDataInfo = (text) => {
    setVisible(true)
    props.dispatch({ 
      type: 'data/dataInfo',
      payload: {
        uid: text.uid
        }
      })
  }

  const handleDataDel = (text) => {
     new Promise((resolve, reject)=>{
      props.dispatch({
        type: 'data/dataDel',
        payload: {
          uid: text.uid,
          resolve,
          reject
        }
      })
    }).then(()=>{
      message.success('删除成功！')
    }).catch(()=>{
      message.error('删除失败!')
    })
  }

  const columns = [
    {
      title: '展示名',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '下载',
      dataIndex: 'url',
      key: 'url',
      render: u=><a href={`${host}/${u}`}>下载</a>
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={()=>handleDataInfo(text, record)}>详情</a>
          <a onClick={()=>handleDataDel(text, record)}>删除</a>
        </span>
      ),
    },
  ];



  const handleOk = () =>{
    console.log('handleOk')
  }

  const data = [];

  for (let i = 0; i < 100000; i += 1) {
    data.push({
      key: i,
    });
  }

  
  return (
    <div>
        <Table columns={columns} dataSource={props.dataList} />
        <Modal
          title="详情"
          visible={visible}
          onOk={handleOk}
          onCancel={()=>setVisible(false)}
          width='80%'
          style={{position: 'relative', top: '15px'}}
        >
          { dataInfo.res_title && dataInfo.res_data  && (
         <DataInfoTable 
            columns={dataInfo.res_title}
            dataSource={dataInfo.res_data}
            scroll={{
            y: 300,
            x: '100vw',
            }}
          /> 
        )
        }
  
        </Modal>
    </div>
  )
}

export default connect((state)=>{
  return {
    dataList: state.data.dataList,
    dataInfo: state.data.dataInfo,
  }
})(DataMange);
