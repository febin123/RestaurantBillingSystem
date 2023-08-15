import React from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {Col, Row}from 'antd'
import axios from 'axios'
import '../styles/authentication.css'
import {Button, Form, Input, message, Modal} from 'antd'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
function Register() {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const onFinish=(values)=>{
        dispatch({type:'showLoading'})
        axios.post('/api/users/register',values).then((res)=>{
          dispatch({type:'hideLoading'})
          message.success('Registeration successfull, please wait for verification')
        }).catch(()=>{
          dispatch({type:'hideLoading'})
          message.error('Something went wrong')
        })
    }
    useEffect(()=>{
      if(localStorage.getItem('BillingSystem'))
      navigate('/home')
    },[])
  return (
    <div className='authentication'>
        <Row>
            <Col lg={8} xs={22}>
                <Form

                layout="vertical"
                onFinish={onFinish}
              >
                <h1> <b> Restaurant Billing System </b></h1>
                <hr />
                <h3>Register</h3>
                {/* add new food item modal */}
                <Form.Item name="name" label="Name">
                  <Input />
                </Form.Item>
                <Form.Item name="userId" label="User ID">
                  <Input />
                </Form.Item>
                <Form.Item name="password" label="Password">
                  <Input type='password'/>
                </Form.Item>
    
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/login">Already Registered? Click Here To Login</Link>
                  <Button htmlType="submit" type="primary">
                    Register
                  </Button>
                </div>
    
                </Form>
          </Col>
        </Row>
    </div>
  )
}

export default Register
