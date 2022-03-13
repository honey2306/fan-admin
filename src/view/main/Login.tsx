import React from 'react'
import {Button, Card, Form, Input} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {handle} from "../../utils/api"
import axios from "axios"
import {useDispatch} from "react-redux"
import {toggleIsLogin} from "../../store/actions"

function Login() {
  const dispatch = useDispatch()
  const submit = async (value: any) => {
    handle(axios.post('/users/login', value, {withCredentials: true}), '登录').then((res: any) => {
      dispatch(toggleIsLogin(true))
    })
  }

  return (
    <div className={'bg'}>
      <div className={'title'}>Fan</div>
      <div className={'main'}>
        <Card>
          <Form
            name="login"
            labelCol={{span: 4}}
            onFinish={submit}
            wrapperCol={{offset: 1, span: 19}}
            initialValues={{remember: true}}
            autoComplete="off"
          >
            <Form.Item
              label="Username:"
              name="userName"
              rules={[{required: true, message: 'Please input your username!'}]}
            >
              <Input placeholder="请输入用户名" allowClear prefix={<UserOutlined/>}/>
            </Form.Item>

            <Form.Item
              label="Password:"
              name="passWord"
              rules={[{required: true, message: 'Please input your password!'}]}
            >
              <Input.Password placeholder="请输入密码" allowClear prefix={<LockOutlined/>}/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 0, span: 24}}>
              <Button type="primary" htmlType="submit">登 录</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Login
