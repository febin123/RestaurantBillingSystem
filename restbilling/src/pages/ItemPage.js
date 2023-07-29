import React,{useEffect,useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
import {Button, Form, Input, message, Modal, Select, Table  } from 'antd'
import { Layout } from 'antd';
const ItemPage = () => {
  const[itemsData,setItemsData]=useState([])
  const[addEditModal,setAddEditModal]=useState(false) 
  const dispatch=useDispatch()

  //useEffect
  useEffect(()=>{
      const getAllItems =async()=>{
        dispatch({type:'showLoading'})
          try{
              const {data}=await axios.get('/api/items/get-item')
              dispatch({type:'hideLoading'})
              setItemsData(data)
              console.log(data)
          }
          catch(error){
            dispatch({type:'hideLoading'})
              console.error(error) 
          }
      }
      getAllItems();
  },[])

  const onFinish=(values)=>{
    console.log(values)
  }
  const columns=[
    {title:'Name',dataIndex:'name'},
    {title:'Image',dataIndex:'image',
    render:(image,record)=><img src={image} alt={record.name} height="60" width="60"/>},
    {title:'Price',dataIndex:'price'},
    {title:'Category',dataIndex:'category'},
    {title:'Actions',dataIndex:"_id",render:(id,record)=> <div className='d-flex'> <DeleteOutlined className='mx-2' />
    <EditOutlined className='mx-2'/> </div> }
  ]

  return (
    <div>
        <DefaultLayout>
          <div className="d-flex justify-content-between">
              <h1>Item List</h1>
              <button type='primary' onClick={()=>setAddEditModal(true)}>Add Item</button>
          </div>
      <Table columns={columns} dataSource={itemsData} bordered />

      <Modal onCancel={()=>setAddEditModal(false)} visible={addEditModal} title='Add New Item' footer={false}>
      <Form
        
            layout="vertical"
            onFinish={onFinish}
          >
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
                <Select.Option value="starter">Starter</Select.Option>
                <Select.Option value="mainCourse">Main Course</Select.Option>
                <Select.Option value="desert">Desert</Select.Option>
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
    </div>
  )
}

export default ItemPage
