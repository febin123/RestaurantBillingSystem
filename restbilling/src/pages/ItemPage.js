import React,{useEffect,useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
import { Modal, Table } from 'antd'
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

      <Modal visible={addEditModal} title='Add New Item' footer={false}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, esse.
      </Modal>
      </DefaultLayout>
    </div>
  )
}

export default ItemPage
