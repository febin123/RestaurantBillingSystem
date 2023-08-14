import React from 'react'
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
                {/* add new food item modal */}
                <Form.Item name="name" label="Name">
                  <Input />
                </Form.Item>
                <Form.Item name="price" label="Price">
                  <Input />
                </Form.Item>
                <Form.Item name="image" label="Image URL">
                  <Input />
                </Form.Item>
    
                <div className="d-flex justify-content-end">
                  <Button htmlType="submit" type="primary">
                    SAVE
                  </Button>
                </div>
    
                </Form>
          </Col>
        </Row>
    </div>
  )
}

export default Register
