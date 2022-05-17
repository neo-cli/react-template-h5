import React, { PropsWithChildren } from "react";
import "./index.less";
import { Form, Input, Icon, Button, message } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import mapDispatchToProps from "@/store/actions/profile";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Nav from "@/components/Nav";
function Register(props) {
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    props.register(values);
  };
  return (
    <>
      <Nav history={props.history}>用户注册</Nav>
      <Form
        className="register-form"
        form={form}
        name="注册表单"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "用户名不能为空",
            },
          ]}
        >
          <Input
            placeholder="用户名"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "密码不能为空",
            },
          ]}
        >
          <Input
            placeholder="密码"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "确认密码不能为空",
            },
          ]}
        >
          <Input
            placeholder="确认密码"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "邮箱不能为空",
            },
            {
              pattern: /@/,
              message: "邮箱格式不正确",
            }
          ]}
        >
          <Input
            placeholder="邮箱"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
          或者 <Link to="/login">登录</Link>
        </Form.Item>
      </Form>
    </>
  );
}
//WrappedRegister就是一个高阶组件 ，会向Register组件里传递属性 name没有什么用

let mapStateToProps = (state) => state.profile;
export default connect(mapStateToProps, mapDispatchToProps)(Register);
