import React from 'react';
import { Menu, Layout, Button } from 'antd';
import SidebarItems from './SidebarItems';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed, toggleCollapse }) => (
  <Sider
    trigger={null}
    collapsible
    collapsed={collapsed}
    width={250}
    collapsedWidth={80}
    theme="light"
    className="transition-all duration-300  border-r border-[#e8eaed]"
  >
    <div className="relative h-16 px-4 flex items-center justify-start mb-4">
      {/* HR Manager Title (only visible when expanded) */}
      <div
    className={`font-bold text-xl whitespace-nowrap transition-all duration-500 ease-in-out
      ${collapsed ? 'opacity-0 -translate-x-5' : 'opacity-100 translate-x-0'}
    `}
  >
    HR Manager
  </div>

      {/* Collapse Button (always rendered, but positioned absolutely when collapsed) */}
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
      defaultSelectedKeys={['1']}
      items={SidebarItems}
    />
  </Sider>
);
export default Sidebar;
