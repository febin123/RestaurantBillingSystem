import React,{useState,useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import {Col, Row}from 'antd'
import ItemList from '../components/ItemList'
import { useDispatch } from 'react-redux'
// import Homepage from './Homepage';

const Homepage = () => {

    const[itemsData,setItemsData]=useState([])

    const[selectedCategory,setSelectedCategory]=useState('Soft Drinks')
    const categories=[
      {
        name:'Soft drinks',
        imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZcXBffUKO4BvtATUXlCV2JcjvElklB7wQ4t1Wk8vxVQ&s'
      },
      {
        name:'Curry',
        imageUrl:'https://www.simplyrecipes.com/thmb/-QzmQynep4nIQ3tncO0v3_xpPd0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__01__Butter-Chicken-LEAD-2-6ca76f24bbe74114a09958073cb9c76f.jpg'
      },
      {
        name:'Rice',
        imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDI2GVHXL_WNzLsH9Tx97KIpXmE9UN1IuIl8leMzisqp-3lei7IWVB_JuxXHY9YPb1iE4&usqp=CAU'
      }
    ]
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
        <div className="d-flex">
          {categories.map((category)=>{
            return <div className='d-flex category'>
                <h5>{category.name}</h5>
                <img src="{category.imageUrl}" height='60' width='80' alt="category" />
            </div>
          })}
        </div>
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
