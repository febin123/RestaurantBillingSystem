import React from 'react'
import {Link} from 'react-router-dom'
import {Col, Row}from 'antd'
import '../styles/authentication.css'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import {Button, Form, Input, message, Modal} from 'antd'
function Login() {

  const dispatch=useDispatch()
  const onFinish=(values)=>{
    dispatch({type:'showLoading'})
    axios.post('/api/users/login',values).then((res)=>{
      dispatch({type:'hideLoading'})
      message.success('Login Successfull')
    }).catch(()=>{
      dispatch({type:'hideLoading'})
      message.error('Something went wrong')
    })
}
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
                <h3>Login</h3>
                {/* add new food item modal */}
              
                <Form.Item name="userid" label="User ID">
                  <Input />
                </Form.Item>
                <Form.Item name="password" label="Password">
                  <Input type='password'/>
                </Form.Item>
    
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/register">Not Yet Registered? Click Here To Register</Link>
                  <Button htmlType="submit" type="primary">
                    Login
                  </Button>
                </div>
    
                </Form>
          </Col>
        </Row>
    </div>
  )
}

export default Login
