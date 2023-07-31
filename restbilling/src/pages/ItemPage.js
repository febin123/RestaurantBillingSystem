import React,{useEffect,useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
import {Button, Form, Input, message, Modal, Select, Table  } from 'antd'
import { Layout } from 'antd';

const ItemPage = () => {
  const[itemsData,setItemsData]=useState([])
  const[editingItem,setEditingItem]=useState(null)
  const[addEditModal,setAddEditModal]=useState(false) 
  const dispatch=useDispatch()
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-item")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };




  //useEffect
  useEffect(() => {
    getAllItems();
  }, []);

  // const onFinish=(values)=>{
  //   console.log(values)
  // }

  
  //adding fooditems into the backend
  const onFinish=(values)=>{
    dispatch({type:'showLoading'})
    try{
        // adding the food items
        const {data}=axios.post('/api/items/add-item',values)
        dispatch({type:'hideLoading'})
        message.success("Item added sucessfully")
        console.log(data)
        setAddEditModal(false)
        getAllItems()
    }
    catch(error){
      dispatch({type:'hideLoading'})
      message.error("something went wrong")
        console.error(error) 
    }
  }
  // number of columns in each food items
  const columns=[
    {title:'Name',dataIndex:'name'},
    {title:'Image',dataIndex:'image',
    render:(image,record)=><img src={image} alt={record.name} height="60" width="60"/>},
    {title:'Price',dataIndex:'price'},
    {title:'Category',dataIndex:'category'},
    {title:'Actions',dataIndex:"_id",render:(id,record)=> <div className='d-flex'>
      <EditOutlined className='mx-2' onClick={()=>{setEditingItem(record); setAddEditModal(true)}}/>
       <DeleteOutlined className='mx-2' />
     </div> }
  ]

  return (
    <div>
        <DefaultLayout>
          <div className="d-flex justify-content-between">
              <h1>Food Item List</h1>
              <button type='primary' onClick={()=>setAddEditModal(true)}>Add Item</button>
          </div>
      <Table columns={columns} dataSource={itemsData} bordered />

      {/* adding food item modal */}
      <Modal onCancel={()=>setAddEditModal(false)} visible={addEditModal} title='Add New Item' footer={false}>
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
