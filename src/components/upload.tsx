import React, { useEffect, useState } from "react"
import { CloseCircleOutlined, InboxOutlined } from "@ant-design/icons"
import { Image, message, Upload } from 'antd'
import { uploadFile } from "../utils"

const { Dragger } = Upload

const UploadFile = (props: any) => {
  const { success, defaultValue = '' } = props
  const [imgSrc, setImgSrc] = useState('')
  const uploadFn = async (file: File) => {
    const url = await uploadFile(file)
    success(url)
    setImgSrc(url)
  }
  const propsItem = {
    name: 'file',
    maxCount: 1,
    action: 'http://api-test.netease.com:3000/upload',
    onChange(info: any) {
      const { status } = info.file
      if (status !== 'uploading') {
        uploadFn(info.file)
      }
      if (status === 'done') {
        setImgSrc(info.file.response.url)
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files)
    },
    beforeUpload() {
      return false
    }
  }
  const closeFile = () => {
    setImgSrc('')
  }

  useEffect(() => {
    defaultValue && setImgSrc(defaultValue)
  }, [defaultValue])
  return (
    <>
      {
        imgSrc ? <>
          <Image
            className={'imgItem'}
            src={imgSrc}
          />
          <CloseCircleOutlined className={'close'} onClick={() => closeFile()}/>
        </> : <Dragger {...propsItem}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
          </p>
        </Dragger>
      }
    </>
  )
}

export default UploadFile
