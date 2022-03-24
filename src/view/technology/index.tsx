import React, { useRef, useState } from "react"
import { columns } from "./config"
import Combination from "../../components/common/Combination"
import { handle } from "../../utils/api"
import axios from "axios"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import ArticleEdit from "../../components/ArticleEdit"

const Technology = () => {
  const [isAdd, setIsAdd] = useState(false)
  const [activeId, setActiveId] = useState('')
  const [info, setInfo] = useState({})
  const [isPub, setIsPub] = useState(false)
  const comRef = useRef(null)
  const defer = (pageInfo: any) => {
    return handle(axios.get(`/technology/list?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`), '获取类型列表', false, true)
  }

  const edit = (row: any) => {
    setIsPub(row.status === 1)
    setActiveId(row._id)
    setIsAdd(true)
    setInfo(row)
  }

  const del = (row: any) => {
    handle(axios.post('/technology/del', { _id: row._id }), '删除文章', true, true).then(() => {
      (comRef.current as any).refresh()
    })
  }

  const add = () => {
    setInfo({})
    setIsAdd(true)
  }

  const back = () => {
    setIsAdd(false)
  }

  const addItem = (info: any, text: string) => {
    handle(axios.post('/technology/add', info), text, true, true).then((res: any) => {
      setActiveId(res.data._id)
    })
  }

  const editItem = (info: any, text: string) => {
    info._id = activeId
    handle(axios.put('/technology/edit', info), text, true, true).then((res: any) => {
      setActiveId(res.data._id)
    })
  }

  const save = (info: any) => {
    activeId ? editItem(info, '保存草稿') : addItem(info, '保存草稿')
  }

  const pub = (info: any) => {
    activeId ? editItem(info, '发布文章') : addItem(info, '发布文章')
  }

  const tableSlot = <Button className={'addItem'} onClick={() => add()} icon={<PlusOutlined/>}
    type={"primary"}>发布文章</Button>
  return (
    <>
      {
        isAdd ? <ArticleEdit hasType={true}
          back={back}
          propsSave={save}
          propsPub={pub}
          info={info}
          isPub={isPub}
        />
          : <Combination columns={
            columns(edit, del)}
          tableSlot={tableSlot}
          defer={defer}
          ref={comRef}
          />
      }
    </>
  )
}

export default Technology
