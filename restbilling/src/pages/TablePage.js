import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducer } from './../redux/rootReducer';
import {DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons'
import { Form, Input, message,Select,Table,Button, Modal  } from 'antd'
const TablePage = () => {

  const dispatch=useDispatch()
  const {cartItems}=useSelector(state=>state.rootReducer)
  const [billChargeModal,setBillChargeModal]=useState(false)
  const[subTotal,setSubTotal]=useState(0)

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

  //calculating the grand total
  useEffect(()=>{
    let temp=0
    cartItems.forEach((item)=>{
      temp=temp+(item.price * item.quantity)
    })

    setSubTotal(temp)
  },[cartItems])

  
  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItems}/>
      <hr />
      <div className="d-flex justify-content-end flex-column align-items-end">
        <div className="subtotal">
          <h3>SUB TOTAL: <b>€{subTotal}/-</b> </h3>
        </div>

        <Button type='primary' onClick={()=>setBillChargeModal(true)}>CHARGE BILL</Button>
      </div>
      <Modal title='Charge Bill' visible={billChargeModal}>

      <Form
                
                layout="vertical"
                onFinish={onFinish}
              >
                {/* add new food item modal */}
                <Form.Item name="name" label="Name">
                  <Input />
                </Form.Item>
                <Form.Item name="price" label="Price">
                  <Input />
                </Form.Item>
                <Form.Item name="image" label="Image URL">
                  <Input />
                </Form.Item>
    
                <Form.Item name="category" label="Category">
                  <Select>
                    <Select.Option value="Starter">Starter</Select.Option>
                    <Select.Option value="Main Course">Main Course</Select.Option>
                    <Select.Option value="Desert">Desert</Select.Option>
                  </Select>
                </Form.Item>
    
                <div className="d-flex justify-content-end">
                  <Button htmlType="submit" type="primary">
                    SAVE
                  </Button>
                </div>
    
          </Form>

      </Modal>

    </DefaultLayout>
  )
}

export default TablePage
