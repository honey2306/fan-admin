import React from "react"
import { Button, Image, Tag } from "antd"
import { parseTime } from "../../utils"

export const columns = (edit: Function, del: Function) => [
  {
    title: '标题',
    align: 'center',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '作者',
    align: 'center',
    dataIndex: 'author',
    key: 'author'
  },
  {
    title: '封面图片',
    align: 'center',
    dataIndex: 'img',
    key: 'img',
    render: (text: any) => {
      return <Image
        className={'imgItem'}
        height={100}
        src={text}
      />
    }
  },
  {
    title: '浏览人数',
    dataIndex: 'browseNum',
    key: 'browseNum',
    align: 'center'
  },
  {
    title: '发布时间',
    align: 'center',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text: any) => {
      return parseTime(new Date(text))
    }
  },
  {
    title: '更新时间',
    align: 'center',
    dataIndex: 'updateTime',
    key: 'updateTime',
    render: (text: any) => {
      return parseTime(new Date(text))
    }
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
    key: 'status',
    render: (text: any) => {
      return < Tag color={getTagType(text).color}>{getTagType(text).text}</Tag>
    }
  },
  {
    title: '操作',
    dataIndex: 'op',
    key: 'op',
    align: 'center',
    render: (text: any, record: any) => (
      <>
        <Button onClick={() => edit(record)}>编辑</Button>
        <Button onClick={() => del(record)} type={'primary'} danger>删除</Button>
      </>
    )
  }
]

const getTagType = (status: number) => {
  let type: any = {}
  switch (status) {
  case 1:
    type = {
      color: 'green',
      text: '已发布'
    }
    break
  case 2:
    type = {
      color: 'geekblue',
      text: '草稿'
    }
    break
  default:
    type = {
      color: 'purple',
      text: '发布后修改'
    }
    break
  }
  return type
}
