import React from 'react'
import { Card, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Login() {

    const submit = (value: any) => {

    }
    return (
        <div className={'bg'}>
            <div className={'title'}>Fan</div>
            <div className={'main'}>
                <Card>
                    <Form
                        name="login"
                        labelCol={{ span: 4 }}
                        onFinish={submit}
                        wrapperCol={{ offset: 1, span: 19 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username:"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input  placeholder="请输入用户名" allowClear prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item
                            label="Password:"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="请输入密码" allowClear prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                            <Button type="primary" htmlType="submit">
                                登 录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default Login;
