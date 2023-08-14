import React from 'react'
import {Link} from 'react-router-dom'
import {Col, Row}from 'antd'
import '../styles/authentication.css'
import {Button, Form, Input, message, Modal} from 'antd'
function Register() {

    const onFinish=(values)=>{
        console.log(values)
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
                <h3>Register</h3>
                {/* add new food item modal */}
                <Form.Item name="name" label="Name">
                  <Input />
                </Form.Item>
                <Form.Item name="userid" label="User ID">
                  <Input />
                </Form.Item>
                <Form.Item name="password" label="Password">
                  <Input type='password'/>
                </Form.Item>
    
                <div className="d-flex justify-content-end">
                    <Link to="./Login.js">Already Registered? Click Here To Login</Link>
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
