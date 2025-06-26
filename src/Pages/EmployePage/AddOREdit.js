import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { App } from "antd";

import {
  useCreateEmployeeMutation,
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../../Api/EmployyApi/index";
import { useGetDepartmentsQuery } from "../../Api/DepartmentsApi";

const EmployeeModal = ({ type, initialValues }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const isEdit = type === "edit";

  const { data: employees, isLoading } = useGetDepartmentsQuery({
    page: 1,
    limit: 10,
    search: "",
  });

  console.log(employees);

  const [createEmployee, { isLoading: creating }] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: updating }] = useUpdateEmployeeMutation();

  const showModal = () => {
    form.setFieldsValue(isEdit ? initialValues : {});
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (isEdit) {
        await updateEmployee({ id: initialValues.id, ...values }).unwrap();
        message.success("Employee updated successfully.");
      } else {
        await createEmployee(values).unwrap();
        message.success("Employee added successfully.");
      }

      form.resetFields();
      setVisible(false);
    } catch (error) {
      console.error("Operation failed:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Button
        type={isEdit ? "default" : "primary"}
        icon={isEdit ? <EditOutlined /> : <PlusOutlined />}
        onClick={showModal}
      >
        {isEdit ? "Edit " : "Add Employee"}
      </Button>

      <Modal
        title={isEdit ? "Edit Employee" : "Add Employee"}
        open={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        okText={isEdit ? "Update" : "Add"}
        confirmLoading={creating || updating}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter the full name!" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: "Please enter the position!" }]}
          >
            <Input placeholder="Enter position" />
          </Form.Item>
          <Form.Item
            name="departmentId"
            label="department"
            rules={[
              { required: true, message: "Please enter the departmentId!" },
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
              {employees?.map((emp) =>
              
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
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter the phone number!" },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter the address!" }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EmployeeModal;
