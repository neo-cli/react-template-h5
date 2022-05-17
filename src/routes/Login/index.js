import React from "react";
import './index.less';
import { Form, Input, Button, message } from "antd";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import mapDispatchToProps  from "@/store/actions/profile";
import Nav from '@/components/Nav';
import { UserOutlined, LockOutlined} from '@ant-design/icons'

const Login = (props) => {
  const [form] = Form.useForm();
  console.log(props, '0.')
  const handleSubmit = (values) => {
    props.login(values);
  }
  return (
    <>
        <Nav history={props.history}>用户登录</Nav>
        <Form
          name="登录表单"
          initialValues={{
            remember: true,
          }}
          className="login-form"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '用户名不能为空'
              }
            ]}
          >
            <Input placeholder="用户名" prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '密码不能为空'
              }
            ]}
          >
            <Input type="password" placeholder="密码" prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >登录</Button>
            或者
            <Link to="/register">注册</Link>
          </Form.Item>
        </Form>
    </>
  )
}
//WrappedRegister就是一个高阶组件 ，会向Register组件里传递属性 name没有什么用
let mapStateToProps = (state) => state.profile;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
