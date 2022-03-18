import React from "react"
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css'
import axios from "axios"
import { handle } from "../utils/api"

const mdParser = new MarkdownIt(/* Markdown-it options */)
const MarkdownEdit = (props: any) => {
  const { getText } = props
  const handleEditorChange = ({ text }: any) => {
    getText(text)
  }
  const onImageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('img', file)
    const data = await handle(axios.post('/upload', formData), '上传图片', true, true)
    return data.data.url
  }
  return (
    <>
      <MdEditor renderHTML={text => mdParser.render(text)}
        onChange={handleEditorChange}
        onImageUpload={onImageUpload}
      />
    </>
  )
}

export default MarkdownEdit
