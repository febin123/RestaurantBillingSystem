import React,{useState} from "react";
import {useSelector}from 'react-redux'
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  MoneyCollectFilled 
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
import { rootReducer } from './../redux/rootReducer';
const { Header, Sider, Content } = Layout;

 const DefaultLayout=({children})=>  {
  // const [collapsed,setCollapsed] =useState(false)
  const {cartItems}=useSelector(state=>state.rootReducer)
const [collapsed,setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(
    !collapsed
    );
  };

  
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h4 className="text-center text-light font-wight-bold mt-4">Restaurant Billing System</h4>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/bills" icon={<CopyOutlined />}>
              <Link to="/bills">Bills</Link>
            </Menu.Item>
            <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
              <Link to="/items">Items</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined />}>
              <Link to="/customers">Cutomers</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined />}>
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
            <div className="cart-item">
              <p>{cartItems.length}</p>
              <MoneyCollectFilled />
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
