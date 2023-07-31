import React,{useState,useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import {Col, Row}from 'antd'
import ItemList from '../components/ItemList'
import { useDispatch } from 'react-redux'
// import Homepage from './Homepage';

const Homepage = () => {

    const[itemsData,setItemsData]=useState([])

    const dispatch=useDispatch()

    //useEffect
    useEffect(()=>{
        const getAllItems =async()=>{
          dispatch({type:'showLoading'})
            try{

              // getting the food items
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
  return (
    <div>
      <DefaultLayout>
      <Row>
        {
            // getting the food item list from the api
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
