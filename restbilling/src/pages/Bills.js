import React,{useEffect,useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {EditOutlined,EyeOutlined} from '@ant-design/icons'
import {Button, Form, Input, message, Modal, Select, Table  } from 'antd'

const Bills = () => {
  const[billsData,setBillsData]=useState([])
  const[editingItem,setEditingItem]=useState(null)
  const[addEditModal,setAddEditModal]=useState(false) 
  const dispatch=useDispatch()


  //get Items API
  const getAllBills = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-item")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setBillsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };


  //useEffect
  useEffect(() => {
    getAllBills();
  }, []);

  // const onFinish=(values)=>{
  //   console.log(values)
  // }

  
  // number of columns in each food items
  const columns=[
    {title:'Id',dataIndex:'_id'},
    {title:'Customer',dataIndex:'customerName'},
    {title:'SubTotal',dataIndex:'subTotal'},
    {title:'Tax',dataIndex:'tax'},
    {title:'Total',dataIndex:'totalAmount'},
    {title:'Actions',dataIndex:"_id",render:(id,record)=> <div className='d-flex'>
      <EditOutlined className='mx-2' onClick={()=>{setEditingItem(record); setAddEditModal(true)}}/>
       <EyeOutlined className='mx-2'onClick={()=>{}}/>
     </div> }
  ]

  return (
    <div>
        <DefaultLayout>
          <div className="d-flex justify-content-between">
              <h1>Food Item List</h1>
              <button type='primary' onClick={()=>setAddEditModal(true)}>Add Item</button>
          </div>
      <Table columns={columns} dataSource={billsData} bordered />

      {/* adding & edit food item modal */}
      {addEditModal && (
          <Modal onCancel={()=>{
            setEditingItem(null)
            setAddEditModal(false)
          }} visible={addEditModal} title={`${editingItem !=null ? 'Edit Food Item' : 'Add new Food Item'}`} footer={false}>
    
          </Modal>
      )}
      </DefaultLayout>
    </div>
  )
}

export default Bills
