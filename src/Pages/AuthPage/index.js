import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../Components/hooks/useAuth';

const { Title } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const { login, loading } = useAuth();

  const handleLogin = async (values) => {
    await login(values);
  };

  return (
    <div >
     

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      >
        <Card style={{ width: 400 }} title={<Title level={3}>Login</Title>} bordered={false}>
          <Form form={form} name="login" initialValues={{ remember: true }} onFinish={handleLogin}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" autoComplete="off" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Checkbox>Remember me</Checkbox>
              <a href="/forgot-password" style={{ float: 'right' }} onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
