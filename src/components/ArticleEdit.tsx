import React, { useEffect, useState } from "react"
import MarkdownEdit from "./MarkdownEdit"
import { Button, Input, Select } from "antd"
import { IconFont } from "../utils"

const { Option } = Select

const ArticleEdit = (props: any) => {
  const { hasType } = props
  let autoInterval = null
  const [title, setTitle] = useState('')
  const [hasSave, setHasSave] = useState(false)
  const [content, setContent] = useState('')
  const [lastSaveTime, setLastSaveTime] = useState('')
  const getText = (text: string) => {
    setContent(text)
  }

  const handleChange = () => {

  }

  const save = () => {
    setHasSave(true)
    setLastSaveTime(`${new Date().getHours()}:${new Date().getMinutes()}`)
  }

  const autoSave = () => {
    autoInterval = null
    autoInterval = setInterval(save, 1000 * 60 * 3)
  }

  const keyDown = (e: any) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      save()
      autoSave()
      e.preventDefault()
    }
  }

  useEffect(() => {
    autoSave()
  }, [])
  return (
    <div className={'articleEdit'} onKeyDown={keyDown}>
      <header>
        {hasSave && <div className={'autoSave'}><IconFont type={'icon-zhengque'}/>上次保存于：{lastSaveTime}</div>}
        <Button className={'save'}>保存草稿</Button>
        <Button className={'pub'}>发布文章</Button>
      </header>
      <div className={'title'}>
        <h2>标题：</h2>
        <div className={'op'}>
          {hasType &&
                        <Select className={'typeSelect'} defaultValue="Jack" style={{ width: 120 }}
                          onChange={handleChange}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                        </Select>}
          <Input className={'input'}/>
        </div>
      </div>
      <div className={'main'}>
        <MarkdownEdit getText={getText}/>
      </div>
    </div>
  )
}

export default ArticleEdit
