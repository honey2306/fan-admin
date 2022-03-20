import { Button } from "antd"
import React from "react"

export const columns = (edit: Function, del: Function) => [
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    labelCol: 3,
    wrapperCol: 20,
    rules: [{ required: true, message: '类型是必填的！' }]
  },
  {
    title: '操作',
    dataIndex: 'op',
    key: 'op',
    align: 'center',
    editHidden: true,
    render: (text: any, record: any) => (
      <>
        <Button onClick={() => edit(record)}>编辑</Button>
        <Button onClick={() => del(record)} type={'primary'} danger>删除</Button>
      </>
    )
  }
]


export const txtList = {
  add: '新建类型',
  edit: '编辑类型'
}
