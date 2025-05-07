import React, { useState } from "react";
import {
  Table,
  Button,
 
  Typography,
  Popconfirm,
  Space,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "../../Api/EmployyApi";
import EmployeeModal from "./AddOREdit";
import { App } from "antd";

const { Title } = Typography;

const Page1 = () => {
 
  const { message } = App.useApp();

  const { data: employees, isLoading } = useGetEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  console.log(employees);
  if (isLoading) return <div>Loading...</div>;

  const dataSource =
    employees?.employees.map((emp, index) => ({
      key: emp.id || index, // Always add a key for each item
      id: emp.id,
      name: emp.name,
      email: emp.email,
      position: emp.position,
      department: emp.department,
      phone: emp.phone,
      address: emp.address,
      // Add more fields as needed
    })) || [];

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id).unwrap();
      message.success("Employee deleted successfully."); // Show success message
    } catch (error) {
      console.error("Failed to delete the employee:", error);
      message.error("Failed to delete the employee. Please try again."); // Show error message
    }
  };

  const columns = [
    { title: "Full Name", dataIndex: "name", key: "name" },
    { title: "Position", dataIndex: "position", key: "position" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <EmployeeModal type="edit" initialValues={record} />
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-10 bg-white rounded-md  ">
      <div className="flex justify-between items-center mb-4">
        <Title level={3}>HR Employee Dashboard</Title>
        <EmployeeModal type="add" />
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
          style: { textAlign: "center" }, // Center the pagination
        }}
        bordered
        scroll={{ x: "max-content" }} // Make the table horizontally scrollable on small screens
        responsive // Automatically adjust table for different screen sizes
      />

    
    </div>
  );
};

export default Page1;
