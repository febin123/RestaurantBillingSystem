import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector } from 'react-redux'
import { rootReducer } from './../redux/rootReducer';
import {DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons'
import { Table } from 'antd';
const TablePage = () => {
  const {cartItems}=useSelector(state=>state.rootReducer)
  const columns=[
    {title:'Name',dataIndex:'name'},
    {title:'Image',dataIndex:'image',
    render:(image,record)=><img src={image} alt={record.name} height="60" width="60"/>},
    {title:'Price',dataIndex:'price'},
    {title:'Quantity',dataIndex:'_id',
    render:(id,record)=>
    <div><PlusCircleOutlined className='mx-3' style={{cursor:'pointer'}}/>
     <b>{record.quantity}</b>
     <MinusCircleOutlined className='mx-3' style={{cursor:'pointer'}}/>
      </div>},
    {title:'Actions',dataIndex:"_id",render:(id,record)=><DeleteOutlined/>}
  ]
  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItems}/>
    </DefaultLayout>
  )
}

export default TablePage
