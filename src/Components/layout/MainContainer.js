import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import Sidebar from './sidebar';
import Navbar from './navbar';
import { useSelector } from 'react-redux';

const { Content } = Layout;

const MainContainer = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const mode = useSelector((state) => state.theme?.mode || 'light');
  const { token } = theme.useToken();

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar collapsed={collapsed}   toggleCollapse={toggleCollapse} />
      <Layout>
        <Navbar
          collapsed={collapsed}
          toggleCollapse={toggleCollapse}
          colorBgContainer={colorBgContainer}
        />
        <Content
          className='p-8 h-screen bg-[#f9fafb]'
          style={{
            flex: 1,
            overflowY: 'auto',
            backgroundColor: mode === 'dark' ? token.colorBgContainer : '#f9fafb',
          }}
        >
         {children }
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainContainer;
