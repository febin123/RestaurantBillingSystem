import React,{useEffect,useState,useRef,useMemo } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {EditOutlined,EyeOutlined} from '@ant-design/icons'
import {Button, Form, Input, message, Modal, Select, Table  } from 'antd'
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
function Bills()  {

  const componentRef = useRef();
  const[billsData,setBillsData]=useState([])
  const[editingItem,setEditingItem]=useState(null)
  const[printBillModalVisibility,setPrintBillModalVisibility]=useState(false)
  const[selectedBill,setSelectedBill]=useState(null)
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


  //creating table columns for bills
  const tableColumns=[
    {title:'Name',dataIndex:'name'},
    {title:'Price',dataIndex:'price'},
    {title:'Quantity',dataIndex:'_id',
    render:(id,record)=>
    <div>
     <b>{record.quantity}</b>
    
      </div>},
       {title:'Total',dataIndex:'_id',
       render:(id,record)=>
       <div>
        <b>{record.quantity * record.price}</b>
       
         </div>}
  ]


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
    {title:'Table No.',dataIndex:'customerName'},
    {title:'SubTotal',dataIndex:'subTotal'},
    {title:'Tax',dataIndex:'tax'},
    {title:'Total',dataIndex:'totalAmount'},
    {title:'Actions',dataIndex:"_id",render:(id,record)=> <div className='d-flex'>
      {/* <EditOutlined className='mx-2' onClick={()=>{setEditingItem(record); setAddEditModal(true)}}/> */}
      <EditOutlined className='mx-2' onClick={()=>{setEditingItem(record); setAddEditModal(true)}}/>
       <EyeOutlined className='mx-2'onClick={()=>{
        setSelectedBill(record)
        setPrintBillModalVisibility(true)}}/>
     </div> }
  ]

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  return (
    <div>
        <DefaultLayout>
          <div className="d-flex justify-content-between">
              <h1>Bill List</h1>
              
          </div>
      <Table columns={columns} dataSource={billsData} bordered />

      {/* adding & edit food item modal */}
      {printBillModalVisibility && (
          <Modal onCancel={()=>{
           setPrintBillModalVisibility(false)
          }} visible={printBillModalVisibility} title='Bill Details' footer={false} width={800}
          >
            <div className="bill-model p-3" ref={componentRef}>
            <div className='d-flex justify-content-between bill-header pb-2'>
                <div>
                    <h1><b>Billing System</b></h1>
                </div>
                <div>
                    <p>Dublin</p>
                    <p>St.Patrick Terrace</p>
                    <p>12345678</p>
                </div>
            </div>
            <div className="bill-customer-details my-2">
                <p><b>Table No.</b>:{selectedBill.customerName}</p>
                <p><b>Phone Number.</b>:{selectedBill.customerPhoneNumber}</p>
                <p><b>Date</b>:{selectedBill.createdAt.toString().substring(0,10)}</p>
            </div>

            <Table dataSource={selectedBill.cartItems} columns={tableColumns} pagination={false}/>

            <div className='dotted-border'>
              <p><b>SUB TOTAL</b>:{selectedBill.subTotal}</p>
              <p><b>TAX</b>:{selectedBill.tax}</p>
            </div>
            <div>
              <h2><b>GRAND TOTAL:{selectedBill.totalAmount}</b></h2>
            </div>
            <div className="dotted-border "></div>
            <div className="text-center">
              <p>Thanks</p>
              <p>Visit Again!</p>
            </div>
            </div>

            <div className="d-flex justify-content-end">
                  {/* <Button type='primary' onClick={()=>{handlePrint()}}>Print Bill</Button> */}
                  <ReactToPrint
        trigger={() => <Button type='primary'>Print Bill</Button>}
        content={() => componentRef.current}
      />
          </div>
    
          </Modal>
      )}
      </DefaultLayout>
    </div>
  )
}

export default Bills
