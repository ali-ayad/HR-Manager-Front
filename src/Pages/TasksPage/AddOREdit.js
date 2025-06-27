import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

const TaskModal = ({ type, initialValues, onSave }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const isEdit = type === "edit";

  const showModal = () => {
    form.setFieldsValue(isEdit ? initialValues : {});
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
      form.resetFields();
      setVisible(false);
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <>
      <Button
        type={isEdit ? "default" : "primary"}
        icon={isEdit ? <EditOutlined /> : <PlusOutlined />}
        onClick={showModal}
      >
        {isEdit ? "Edit" : "Add Task"}
      </Button>

      <Modal
        title={isEdit ? "Edit Task" : "Add Task"}
        open={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        okText={isEdit ? "Update" : "Add"}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Task Title"
            rules={[{ required: true, message: "Please enter task title!" }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          <Form.Item
            name="employee"
            label="Assigned To"
            rules={[{ required: true, message: "Please assign the task to someone!" }]}
          >
            <Input placeholder="Enter employee name" />
            {/* You can replace this with Select if you have a list of employees */}
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select task status!" }]}
          >
            <Select placeholder="Select task status">
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskModal;
