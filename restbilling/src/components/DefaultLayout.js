import React,{useEffect, useState} from "react";
import {useSelector}from 'react-redux'
import { Layout, Menu } from "antd";
import { Link,useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ContainerOutlined
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
import { rootReducer } from './../redux/rootReducer';
import Customers from './../pages/Customers';
const { Header, Sider, Content } = Layout;

 const DefaultLayout=({children})=>  {
  const navigate=useNavigate();
  
  const {cartItems,loading}=useSelector(state=>state.rootReducer)
const [collapsed,setCollapsed] = useState(false);


// start of toggle menu
  const toggle = () => {
    setCollapsed(
    !collapsed
    );
  };

  //to get localstorage data
  useEffect(()=>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
  },[cartItems])

  
    return (
      <Layout>
        {loading && (

          //loading spinner
          <div className="spinner">
          <div className="spinner-border"role="status">
                 
          </div>
          </div>

        )}
        <Sider trigger={null} collapsible collapsed={collapsed}>

          {/* logo */}
          <div className="logo">
            <h4 className="text-center text-light font-wight-bold mt-4">{collapsed ? 'BS' : 'Restaurant Billing System'}</h4>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
          >
            {/*Menu Item*/}
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/tables" icon={< UserOutlined />}>
              <Link to="/tables">Table</Link>
            </Menu.Item>
            <Menu.Item key="/bills" icon={<CopyOutlined />}>
              <Link to="/bills">Bills</Link>
            </Menu.Item>
            <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
              <Link to="/items">Food Items</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined />}>
              <Link to="/customers">Customers</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={()=>{
              localStorage.removeItem('BillingSystem')
              navigate('/login')
            }}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick:toggle,
              }
            )}
            <div className="cart-item d-flex justify-content-space-between flex-row" 
            onClick={()=> navigate('/tables')}>
              <p>{cartItems.length}</p>
              <ContainerOutlined />
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }

export default DefaultLayout
