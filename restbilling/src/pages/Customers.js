import React,{useEffect,useState,useRef,useMemo } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {EditOutlined,EyeOutlined} from '@ant-design/icons'
import {Button, Form, Input, message, Modal, Select, Table  } from 'antd'
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';

function Customers()  {

  const componentRef = useRef();
  const[billsData,setBillsData]=useState([])
  const[editingItem,setEditingItem]=useState(null)
  const[addEditModal,setAddEditModal]=useState(false) 
  const dispatch=useDispatch()


  //get Items API
  const getAllBills = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/bills/get-all-bills")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data=response.data
        data.reverse()
        setBillsData(data);
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
    {title:'Customer',dataIndex:'customerName'},
    {title:'Phone Number',dataIndex:'customerPhoneNumber'},
    {title:'Created On',dataIndex:'createdAt',
    render:(value)=><span>{value.toString().substring(0,10)}</span>},

  ]

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  return (
    <div>
        <DefaultLayout>
          <div className="d-flex justify-content-between">
              <h1>Customers List</h1>
              
          </div>
      <Table columns={columns} dataSource={billsData} bordered />

    
      </DefaultLayout>
    </div>
  )
}

export default Customers
