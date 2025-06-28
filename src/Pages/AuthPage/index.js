import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, ConfigProvider, theme } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../Components/hooks/useAuth';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const { login, loading } = useAuth();

  const handleLogin = async (values) => {
    await login(values);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        components: {
          Card: {
            colorBgContainer: 'rgba(255, 255, 255, 0.9)',
          },
        },
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          background: 'var(--background-gradient)',
        }}
        className="login-background"
      >
        <Card
          style={{
            width: 400,
            borderRadius: 16,
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(6px)',
          }}
          bordered={false}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={3} style={{ margin: 0 }}>Welcome Back</Title>
            <Text type="secondary">Please login to your account</Text>
          </div>

          <Form
            form={form}
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Email"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Checkbox>Remember me</Checkbox>
                <a href="/forgot-password" onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                style={{ borderRadius: 8 }}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default LoginPage;
