import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../Api/TasksApi";
import { useGetEmployeesQuery } from "../../Api/EmployyApi";


const TaskModal = ({ type, initialValues = {}, onSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const isEdit = type === "edit";

  const { data: employees, isLoading } = useGetEmployeesQuery({
      page:1,
      limit:10,
     
    });

  
  const [createTask, { isLoading: creating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: updating }] = useUpdateTaskMutation();

  const showModal = () => {
    form.setFieldsValue(isEdit ? initialValues : {});
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEdit) {
        await updateTask({ id: initialValues.id, ...values }).unwrap();
        message.success("Task updated successfully");
      } else {
        await createTask(values).unwrap();
        message.success("Task created successfully");
      }

      form.resetFields();
      setVisible(false);
      onSuccess?.(); // refetch list if provided
    } catch (error) {
      console.error("Error saving task:", error);
      message.error("Failed to save task");
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
        confirmLoading={creating || updating}
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
            name="employeeId"
            label="employee"
            rules={[
              { required: true, message: "Please enter the employee!" },
            ]}
          >
            <Select
              placeholder="Select department"
              loading={isLoading}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {employees?.employees.map((emp) =>
              
                  <Select.Option
                    key={emp.id}
                    value={emp.id}
                  >
                    {emp.name}
                  </Select.Option>
               
              )}
            </Select>
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
