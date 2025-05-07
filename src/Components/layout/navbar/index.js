import React from 'react';
import { Button, Layout, Avatar, Dropdown, message } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import BreadcrumbNav from '../Breadcrumb';

const { Header } = Layout;


const Navbar = ({ collapsed, toggleCollapse, colorBgContainer }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token
    message.success("تم تسجيل الخروج بنجاح"); // Optional: success message
    navigate("/login"); // Redirect to login
  };

  const menu = {
    items: [
      {
        key: 'logout',
        label: (
          <Button type="text" onClick={handleLogout} danger>
            Logout
          </Button>
        ),
      },
    ],
  };

  return (
    <Header
    className="px-8 flex justify-between items-center border-b border-[#e8eaed]"
    style={{ background: colorBgContainer }}
  >
     <BreadcrumbNav />
  
      <Dropdown menu={menu} placement="bottom" trigger={['click']}>
        {/* ✅ Only one direct child element allowed */}
        <div style={{ cursor: 'pointer' }}>
          <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
        </div>
      </Dropdown>
     
    </Header>
  );
};

export default Navbar;
