import React, { useState, useContext } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Flex,
  message,
  App as AntApp,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const { Title, Text, Link } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, password } = values; 
    setLoading(true);
    try {
      const res = await login(username, password);
      console.log("Login response:", res);
      message.success("Login berhasil! Redirecting...");
      navigate("/checklistboard");
    } catch (err) {
      message.error(err?.response?.data?.message || "Gagal login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AntApp>
      <div
        style={{
          minHeight: "85vh",
          width: "85vw",
          display: "grid",
          placeItems: "center",
          padding: 16,
          background:
            "radial-gradient(circle at 0% 0%, #e6f4ff, transparent 70%), radial-gradient(circle at 100% 100%, #fff1f0, transparent 70%), linear-gradient(180deg, #ffffff, #f5f5f5)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Card
          bordered={false}
          style={{ width: "100%", maxWidth: 440, borderRadius: 16 }}
          styles={{ body: { padding: 28 } }}
        >
          <Flex vertical align="stretch" gap={18}>
            <div style={{ textAlign: "center" }}>
              <Title level={3} style={{ marginBottom: 4 }}>
                Selamat datang
              </Title>
              <Text type="secondary">
                Masuk untuk melanjutkan ke aplikasi To-Do
              </Text>
            </div>

            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              disabled={loading}
              initialValues={{ remember: true }}
              requiredMark={false}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Username wajib diisi" },
                ]}
              >
                <Input
                  size="large"
                  allowClear
                  prefix={<MailOutlined />}
                  placeholder="masukan username...."
                  autoComplete="username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Password wajib diisi" }]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                icon={<LoginOutlined />}
                block
              >
                Masuk
              </Button>
            </Form>

            <Text style={{ textAlign: "center" }}>
              Belum punya akun? <Link href="#">Daftar</Link>
            </Text>

            <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
              Tips: Coba login dengan <b>admin@example.com</b> / <b>admin123</b>
            </Text>
          </Flex>
        </Card>
      </div>
    </AntApp>
  );
}
