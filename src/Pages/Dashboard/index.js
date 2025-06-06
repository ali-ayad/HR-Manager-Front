import React from 'react';
import { Card, Col, Row, Typography, Avatar } from 'antd';
import {
  UserOutlined,
  CarryOutOutlined,
  ClockCircleOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
// import { Bar, Line } from '@ant-design/charts';

const { Title, Text } = Typography;

const dashboardData = [
  {
    title: 'Total Employees',
    value: 128,
    icon: <UserOutlined />,
    bgColor: '#e6f4ff',
    iconColor: '#1677ff',
  },
  {
    title: 'Pending Tasks',
    value: 42,
    icon: <CarryOutOutlined />,
    bgColor: '#f6ffed',
    iconColor: '#52c41a',
  },
  {
    title: 'Attendance Today',
    value: '95%',
    icon: <ClockCircleOutlined />,
    bgColor: '#fffbe6',
    iconColor: '#faad14',
  },
  {
    title: 'Performance Score',
    value: 87,
    icon: <LineChartOutlined />,
    bgColor: '#f9f0ff',
    iconColor: '#722ed1',
  },
];

// Fake bar chart data
const barData = [
  { department: 'HR', tasks: 38 },
  { department: 'IT', tasks: 52 },
  { department: 'Finance', tasks: 31 },
  { department: 'Sales', tasks: 45 },
];

// Fake line chart data
const lineData = [
  { date: 'Mon', value: 90 },
  { date: 'Tue', value: 92 },
  { date: 'Wed', value: 95 },
  { date: 'Thu', value: 91 },
  { date: 'Fri', value: 93 },
  { date: 'Sat', value: 87 },
  { date: 'Sun', value: 88 },
];

const DashboardPage = () => {
  return (
    <div style={{ padding: '16px 16px 0 16px' }}>
      <Title level={4} style={{ marginBottom: 16 }}>Dashboard Overview</Title>

      {/* Cards Section */}
      <Row gutter={[16, 16]}>
        {dashboardData.map((item, index) => (
          <Col xs={24} sm={12} md={12} lg={6} key={index}>
            <Card
              bordered={false}
              bodyStyle={{ padding: '16px 16px' }}
              style={{
                borderRadius: 10,
                height: '100%',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <Avatar
                  size={44}
                  icon={item.icon}
                  style={{
                    backgroundColor: item.bgColor,
                    color: item.iconColor,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Text style={{ color: '#888', fontSize: 12 }}>{item.title}</Text>
                  <div style={{
                    fontSize: 22,
                    fontWeight: 600,
                    marginTop: 4,
                  }}>
                    {item.value}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Section */}
    {/* <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
  <Col xs={24} md={12}>
    <Card
      title="Task Completion by Department"
      bordered={false}
      style={{ borderRadius: 10, height: '100%' }}
      bodyStyle={{ padding: 16 }}
    >
      <div style={{ width: '100%' }}>
        <Bar
          data={barData}
          xField="tasks"
          yField="department"
          autoFit
          height={300}
          padding="auto"
          color="#1677ff"
        />
      </div>
    </Card>
  </Col>
  <Col xs={24} md={12}>
    <Card
      title="Employee Attendance (Last 7 Days)"
      bordered={false}
      style={{ borderRadius: 10, height: '100%' }}
      bodyStyle={{ padding: 16 }}
    >
      <div style={{ width: '100%' }}>
        <Line
          data={lineData}
          xField="date"
          yField="value"
          autoFit
          smooth
          height={300}
          padding="auto"
          color="#52c41a"
        />
      </div>
    </Card>
  </Col>
</Row> */}

    </div>
  );
};

export default DashboardPage;
