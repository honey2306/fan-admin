import React, { useRef, useState } from "react"
import Combination from "../../components/common/Combination"
import { columns, txtList } from "./typeConfig"
import { handle } from "../../utils/api"
import axios from "axios"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"

const Type = () => {
  const [modelShow, setModelShow] = useState(false)
  const [isAdd, setIsAdd] = useState(true)
  const [activeId, setActiveId] = useState(true)
  const [formData, setFormData] = useState({})
  const comRef = useRef(null)
  const onCancel = () => {
    setModelShow(false)
  }

  const edit = (row: any) => {
    setActiveId(row._id)
    setFormData(() => ({ ...row }))
    setModelShow(true)
    setIsAdd(false)
  }

  const del = (row: any) => {
    return handle(axios.post('/type/del', { _id: row._id }), '删除类型', true, true).then(() => {
      (comRef.current as any).refresh()
    })
  }

  const add = () => {
    setFormData({})
    setIsAdd(true)
    setModelShow(true)
  }

  const defer = (pageInfo: any) => {
    return handle(axios.get(`/type/list?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`), '获取类型列表', false, true)
  }

  const addOrEdit = (isAdd: boolean, values: any) => {
    if (isAdd) {
      return handle(axios.post('/type/add', values), '新增类型', true, true)
    } else {
      values._id = activeId
      return handle(axios.put('/type/edit', values), '修改类型', true, true)
    }
  }

  const tableSlot = <Button className={'addItem'} onClick={() => add()} icon={<PlusOutlined/>}
    type={"primary"}>{txtList.add}</Button>
  return (
    <Combination columns={columns(edit, del)} txtList={txtList} addOrEdit={addOrEdit}
      modelShow={modelShow}
      onCancel={onCancel}
      tableSlot={tableSlot}
      isAdd={isAdd}
      formData={formData}
      defer={defer}
      ref={comRef}
    />
  )
}

export default Type
