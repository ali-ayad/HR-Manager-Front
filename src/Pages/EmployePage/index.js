import React, { useState } from "react";
import {
  Table,
  Button,
  Typography,
  Popconfirm,
  Space,
  Input,
} from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";

import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "../../Api/EmployyApi";
import EmployeeModal from "./AddOREdit";
import { App } from "antd";

const { Title } = Typography;

const Page1 = () => {
  const [searchEmploye, setSearchEmploye] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { message } = App.useApp();

  const { data: employees, isLoading } = useGetEmployeesQuery({
    page,
    limit,
    search: searchEmploye,
  });

  const [deleteEmployee] = useDeleteEmployeeMutation();

  const dataSource =
    employees?.employees.map((emp, index) => ({
      key: emp.id || index,
      id: emp.id,
      name: emp.name,
      email: emp.email,
      position: emp.position,
      department: emp.Department.name,
      departmentId: emp.Department.id,
      phone: emp.phone,
      address: emp.address,
    })) || [];
  
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id).unwrap();
      message.success("Employee deleted successfully.");
    } catch (error) {
      console.error("Failed to delete the employee:", error);
      message.error("Failed to delete the employee. Please try again.");
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
    <div className="p-10 rounded-md">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <Title level={3} className="m-0">
          HR Employee Dashboard
        </Title>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search Employe"
            onChange={(e) => setSearchEmploye(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400 w-4 h-4" />}
            className="w-full "
          />
          <EmployeeModal type="add" />
        </div>
      </div>

      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: page,
          pageSize: limit,
          total: employees?.totalEmployees || 0,
          onChange: (newPage) => setPage(newPage),
          showSizeChanger: false,
          style: { textAlign: "center" },
        }}
        bordered
        scroll={{ x: "max-content" }}
        responsive
      />
    </div>
  );
};

export default Page1;
