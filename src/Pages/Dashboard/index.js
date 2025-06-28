import React from "react";
import { Card, Col, Row, Typography, Avatar } from "antd";
import {
  UserOutlined,
  CarryOutOutlined,
  ClockCircleOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
} from "recharts";

const { Title, Text } = Typography;

const dashboardData = [
  {
    title: "Total Employees",
    value: 128,
    icon: <UserOutlined />,
    bgColor: "#e6f4ff",
    iconColor: "#1677ff",
  },
  {
    title: "Pending Tasks",
    value: 42,
    icon: <CarryOutOutlined />,
    bgColor: "#f6ffed",
    iconColor: "#52c41a",
  },
  {
    title: "Attendance Today",
    value: "95%",
    icon: <ClockCircleOutlined />,
    bgColor: "#fffbe6",
    iconColor: "#faad14",
  },
  {
    title: "Performance Score",
    value: 87,
    icon: <LineChartOutlined />,
    bgColor: "#f9f0ff",
    iconColor: "#722ed1",
  },
];

const attendanceData = [
  { day: "Mon", value: 64 },
  { day: "Tue", value: 79 },
  { day: "Wed", value: 72 },
  { day: "Thu", value: 66 },
  { day: "Fri", value: 88 },
  { day: "Sat", value: 75 },
  { day: "Sun", value: 0 },
];

const taskStatusData = [
  { name: "Completed", value: 58, color: "#10b981" }, // emerald
  { name: "In Progress", value: 26, color: "#f59e0b" }, // amber
  { name: "Blocked", value: 8, color: "#f43f5e" }, // rose
  { name: "Pending Review", value: 12, color: "#3b82f6" }, // blue
];

const DashboardPage = () => {
  return (
    <div className="p-4">
      <Title level={4} className="mb-4">
        Dashboard Overview
      </Title>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        {dashboardData.map((item, index) => (
          <Col xs={24} sm={12} md={12} lg={6} key={index}>
            <Card
            
              bodyStyle={{ padding: "16px" }}
              style={{ borderRadius: 10, height: "100%" }}
            >
              <div className="flex items-center gap-3">
                <Avatar
                  size={44}
                  icon={item.icon}
                  style={{
                    backgroundColor: item.bgColor,
                    color: item.iconColor,
                  }}
                />
                <div>
                  <Text style={{ color: "#888", fontSize: 12 }}>
                    {item.title}
                  </Text>
                  <div style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>
                    {item.value}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Line Chart */}
        <Card className="shadow-sm rounded-2xl p-4">
          <Title level={5} className="mb-2">
            Weekly Attendance
          </Title>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={attendanceData}
              margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
            >
              <defs>
                <linearGradient
                  id="attendanceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#1677ff" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1677ff" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="day" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{ borderRadius: 10, borderColor: "#1677ff" }}
                labelStyle={{ fontWeight: 500 }}
              />

              {/* Line with dots */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1677ff"
                strokeWidth={2.5}
                dot={{ r: 5, stroke: "#1677ff", fill: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />

              {/* Area under line */}
              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill="url(#attendanceGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Donut Chart */}
        <Card className="shadow-sm rounded-2xl p-4">
          <Title level={5} className="mb-2">
            Task Status
          </Title>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={taskStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
               
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
