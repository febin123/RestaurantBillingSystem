import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducer } from './../redux/rootReducer';
import {DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons'
import { Table } from 'antd';
const TablePage = () => {

  const dispatch=useDispatch()
  const {cartItems}=useSelector(state=>state.rootReducer)

  //handle increament
  const handleIncreament=(record)=>{
      dispatch({
        type:'UPDATE',
        payload:{...record,quantity:record.quantity+1},
      })
  }
  // handle decrement
  const handleDecreament=(record)=>{
    if(record.quantity!==1){
    dispatch({
      type:'UPDATE',
      payload:{...record,quantity:record.quantity-1},
    })
  }
}
// food item atributes
  const columns=[
    {title:'Name',dataIndex:'name'},
    {title:'Image',dataIndex:'image',
    render:(image,record)=><img src={image} alt={record.name} height="60" width="60"/>},
    {title:'Price',dataIndex:'price'},
    {title:'Quantity',dataIndex:'_id',
    render:(id,record)=>
    <div><PlusCircleOutlined className='mx-3' style={{cursor:'pointer'}} onClick={()=>handleIncreament(record)}/>
     <b>{record.quantity}</b>
     <MinusCircleOutlined className='mx-3' style={{cursor:'pointer'}} onClick={()=>handleDecreament(record)}/>
      </div>},
    {title:'Actions',dataIndex:"_id",render:(id,record)=><DeleteOutlined onClick={()=>dispatch({type:'deleteTable',payload:record})}/>}
  ]
  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItems}/>
    </DefaultLayout>
  )
}

export default TablePage
