import React, { useState } from "react";
import {
  Table,
  Button,
  Typography,
  Popconfirm,
  Space,
  Input,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TaskModal from "./AddOREdit";

const { Title } = Typography;

const TasksPage = () => {
  const [searchTask, setSearchTask] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Setup project repo",
      status: "Pending",
      employee: "Ali Kareem",
    },
    {
      id: 2,
      title: "Design login form",
      status: "In Progress",
      employee: "Mona Ahmed",
    },
    {
      id: 3,
      title: "Connect database",
      status: "Completed",
      employee: "Sami Hussein",
    },
  ]);

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddOrEdit = (values, editId) => {
    if (editId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editId ? { ...task, ...values } : task
        )
      );
    } else {
      const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      setTasks([...tasks, { id: newId, ...values }]);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTask.toLowerCase())
  );

  const statusColors = {
    Pending: "orange",
    "In Progress": "blue",
    Completed: "green",
  };

  const columns = [
    { title: "Task Title", dataIndex: "title", key: "title" },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
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
            onSave={(values) => handleAddOrEdit(values, record.id)}
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
            onChange={(e) => setSearchTask(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400 w-4 h-4" />}
            className="w-full"
          />
          <TaskModal
            type="add"
            onSave={(values) => handleAddOrEdit(values)}
          />
        </div>
      </div>

      <Table
        loading={false}
        dataSource={filteredTasks.map((t) => ({ key: t.id, ...t }))}
        columns={columns}
        pagination={{
          current: page,
          pageSize: limit,
          total: filteredTasks.length,
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
