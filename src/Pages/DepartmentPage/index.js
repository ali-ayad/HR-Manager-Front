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


import { App } from "antd";
import DepartmentModal from "./AddOrEdit";
import { useDeleteDepartmentMutation, useGetDepartmentsQuery } from "../../Api/DepartmentsApi";

const { Title } = Typography;

const DepartmentPage = () => {
  const [searchDepartment, setSearchDepartment] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { message } = App.useApp();

  const { data: departments, isLoading } = useGetDepartmentsQuery({
    page,
    limit,
    search: searchDepartment,
  });

  const [deleteDepartment] = useDeleteDepartmentMutation();

  const dataSource =
    departments?.map((dept, index) => ({
      key: dept.id || index,
      id: dept.id,
      name: dept.name,
      description: dept.description,
    })) || [];

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id).unwrap();
      message.success("Department deleted successfully.");
    } catch (error) {
      console.error("Failed to delete the department:", error);
      message.error("Failed to delete the department. Please try again.");
    }
  };

  const columns = [
    { title: "Department Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <DepartmentModal type="edit" initialValues={record} />
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

  const handleSearchChange = (e) => {
    setSearchDepartment(e.target.value);
    setPage(1); // Reset to first page on search
  };

  return (
    <div className="p-10 rounded-md">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <Title level={3} className="m-0">
          Department Management
        </Title>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search Departments"
            onChange={(e) => setSearchDepartment(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400 w-4 h-4" />}
            className="w-full "
          />
          <DepartmentModal type="add" />
        </div>
      </div>

      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: page,
          pageSize: limit,
          total: departments?.totalDepartments || 0,
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

export default DepartmentPage;
