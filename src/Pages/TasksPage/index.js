import React, { useState } from "react";
import {
  Table,
  Button,
  Typography,
  Popconfirm,
  Space,
  Input,
  Tag,
  message,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TaskModal from "./AddOREdit";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
} from "../../Api/TasksApi";

const { Title } = Typography;

const TasksPage = () => {
  const [searchTask, setSearchTask] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const { data, isLoading, refetch } = useGetTasksQuery({
    page,
    limit,
    search: searchTask,
  });
console.log(data)
  const [deleteTask] = useDeleteTaskMutation();

  const handleDelete = async (id) => {
    try {
      await deleteTask(id).unwrap();
      message.success("Task deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to delete task");
    }
  };

  const statusColors = {
    Pending: "orange",
    "In Progress": "blue",
    Completed: "green",
  };
  const dataSource =
  data?.tasks?.map((task, index) => ({
    key: task.id || index,
    id: task.id,
    title: task.title,
    status: task.status,
    employee: typeof task.Employee === "string" ? task.Employee : task.Employee?.name || "N/A",
  })) || [];


  const columns = [
    { title: "Task Title", dataIndex: "title", key: "title" },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      render: (emp) =>
        typeof emp === "string" ? emp : emp?.name || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status] || "default"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <TaskModal
            type="edit"
            initialValues={record}
            onSuccess={refetch}
          />
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record.id)}
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
          Task Management
        </Title>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search Tasks"
            value={searchTask}
            onChange={(e) => setSearchTask(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400 w-4 h-4" />}
            className="w-full"
          />
          <TaskModal type="add" onSuccess={refetch} />
        </div>
      </div>

      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: (newPage) => setPage(newPage),
          showSizeChanger: false,
        }}
        bordered
        scroll={{ x: "max-content" }}
        responsive
      />
    </div>
  );
};

export default TasksPage;
