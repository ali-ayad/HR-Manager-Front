import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useCreateDepartmentMutation, useUpdateDepartmentMutation } from '../../Api/DepartmentsApi';

const DepartmentModal = ({ type, initialValues = {}, onSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const isEdit = type === 'edit';

  const [createDepartment, { isLoading: isCreating }] = useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();

  const showModal = () => {
    form.setFieldsValue(isEdit ? initialValues : {});
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (isEdit) {
        // Edit department
        await updateDepartment({ id: initialValues.id, ...values }).unwrap();
        message.success('Department updated successfully');
      } else {
        // Add department
        await createDepartment(values).unwrap();
        message.success('Department created successfully');
      }

      form.resetFields();
      setVisible(false);

      if (onSuccess) onSuccess(); // e.g., to refetch list
    } catch (error) {
      console.error('Error saving department:', error);
      message.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Button
        type={isEdit ? 'default' : 'primary'}
        icon={isEdit ? <EditOutlined /> : <PlusOutlined />}
        onClick={showModal}
      >
        {isEdit ? 'Edit' : 'Add Department'}
      </Button>

      <Modal
        title={isEdit ? 'Edit Department' : 'Add Department'}
        open={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        okText={isEdit ? 'Update' : 'Add'}
        confirmLoading={isCreating || isUpdating}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Department Name"
            rules={[{ required: true, message: 'Please enter the department name!' }]}
          >
            <Input placeholder="Enter department name" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DepartmentModal;
