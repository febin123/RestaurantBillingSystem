import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducer } from './../redux/rootReducer';
import {DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons'
import { Form, Input, message,Select,Table,Button, Modal  } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const TablePage = () => {

  const navigate=useNavigate()
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

  const onFinish=(values)=>{
      const reqObject={
        ...values,
        subTotal,
        cartItems,
        tax:Number(((subTotal/100)*10).toFixed(2)),
        totalAmount:Number(subTotal + Number(((subTotal/100)*10).toFixed(2))),
        userId:JSON.parse(localStorage.getItem('BillingSystem'))._id
      }

      axios.post('/api/bills/charge-bill',reqObject)
      .then(()=>{
        message.success("Bill Charged Successfully")
        navigate('/bills')
      })
      .catch(()=>{
        message.error("Something went wrong")
      })
      
  }
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
      <Modal title='Charge Bill' visible={billChargeModal} footer={false} onCancel={()=>setBillChargeModal(false)}>

      <Form
                
                layout="vertical"
                onFinish={onFinish}
              >
                {/* add new food item modal */}
                <Form.Item name="customerName" label="Table No.">
                  <Input />
                </Form.Item>
                <Form.Item name="customerPhoneNumber" label="Phone Number">
                  <Input />
                </Form.Item>
             
    
                <Form.Item name="paymentMode" label="Payment Mode">
                  <Select>
                    <Select.Option value="cash">Cash</Select.Option>
                    <Select.Option value="Card">Card</Select.Option>
                 
                  </Select>
                </Form.Item>

                <div className="charge-bill-amount">
                  <h5>SubTotal : <b>{subTotal}</b>  </h5>
                  <h5>Tax : {((subTotal/100)*10).toFixed(2)} </h5>
                  <hr />
                  <h2>Grand Total : <b>{subTotal+((subTotal/100)*10)}</b> </h2>
                </div>
    
                <div className="d-flex justify-content-end">
                  <Button htmlType="submit" type="primary">
                    GENERATE BILL
                  </Button>
                </div>
    
          </Form>

      </Modal>

    </DefaultLayout>
  )
}

export default TablePage
