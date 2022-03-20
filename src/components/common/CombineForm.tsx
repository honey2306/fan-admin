import React from "react"
import { Form, Input } from "antd"

const CombineForm = (props: any) => {
  const { columns, form } = props
  return (
    <Form
      form={form}
      name="basic"
      preserve={false}
      autoComplete="off"
    >
      {
        columns.map((item: any, index: number) => {
          const { editHidden } = item
          return (!editHidden && <Form.Item
            shouldUpdate
            labelCol={{ span: item.labelCol }}
            wrapperCol={{ span: item.wrapperCol }}
            key={index}
            label={item.title}
            name={item.key}
            rules={item.rules}
          >
            <Input allowClear={true}/>
          </Form.Item>
          )
        })
      }
    </Form>
  )
}

export default CombineForm
