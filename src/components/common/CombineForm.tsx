import React from "react"
import { Form, Input } from "antd"

const CombineForm = (props: any) => {
  const { columns, form } = props
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      preserve={false}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      {
        columns.map((item: any, index: number) => {
          return (<Form.Item
            key={index}
            label={item.title}
            name={item.key}
            rules={item.rules}
          >
            <Input/>
          </Form.Item>)
        })
      }
    </Form>
  )
}

export default CombineForm
