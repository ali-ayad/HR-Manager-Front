import React from 'react';
import { Menu, Layout, Button } from 'antd';
import SidebarItems from './SidebarItems';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();

  // Extract the pathname from the current URL
  const currentPath = location.pathname.toLowerCase();

  // Match the current path with SidebarItems' routes to get the correct selected key
  const selectedKey = SidebarItems.find(item => {
    const link = item.label?.props?.to?.toLowerCase?.();
    return link === currentPath;
  })?.key || '0'; // Fallback to Dashboard

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      collapsedWidth={80}
      theme="light"
      className="transition-all duration-300 border-r border-[#e8eaed]"
    >
      <div className="relative h-16 px-4 flex items-center justify-start mb-4">
        <div
          className={`font-bold text-xl whitespace-nowrap transition-all duration-500 ease-in-out ${
            collapsed ? 'opacity-0 -translate-x-5' : 'opacity-100 translate-x-0'
          }`}
        >
          HR Manager
        </div>

        <div
          className={`absolute transition-all duration-300 ease-in-out ${
            collapsed ? 'left-1/2 -translate-x-1/2' : 'right-0'
          }`}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapse}
            style={{
              fontSize: '16px',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </div>
      </div>

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]} // Dynamically set active item
        items={SidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
