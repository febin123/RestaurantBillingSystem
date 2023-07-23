import React,{useState,useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import {Col, Row}from 'antd'
import ItemList from '../components/ItemList'
// import Homepage from './Homepage';

const Homepage = () => {

    const[itemsData,setItemsData]=useState([])

    //useEffect
    useEffect(()=>{
        const getAllItems =async()=>{
            try{
                const {data}=await axios.get('/api/items/get-item')
                setItemsData(data)
                console.log(data)
            }
            catch(error){
                console.error(error) 
            }
        }
        getAllItems();
    },[])
  return (
    <div>
      <DefaultLayout>
      <Row>
        {
            itemsData.map(item=>(
                <Col xs={24} lg={6} md={12} sm={6}>
                <ItemList item={item}/>
                </Col>
            ))
        }
      </Row>
      </DefaultLayout>
    </div>
  )
}

export default Homepage
