import React, { useEffect } from "react"
import { Form, message, Modal } from "antd"
import CombineForm from "./CombineForm"

const CombineModel = (props: any) => {
  const { columns, txtList, addOrEdit, onCancel, modelShow, isAdd, formData, refresh } = props
  const [form] = Form.useForm()
  const handleOk = () => {
    form.validateFields().then((values: any) => {
      addOrEdit(isAdd, values).then(() => {
        onCancel()
        refresh()
      }).catch((e: any) => {
        console.log(e)
      })
    }).catch((err: any) => {
      message.error('请先完成选项后再提交')
    })
  }

  useEffect(() => {
    modelShow && form.setFieldsValue(isAdd ? {} : formData)
  }, [modelShow])

  return (
    <>
      <Modal title={isAdd ? txtList.add : txtList.edit}
        visible={modelShow}
        destroyOnClose={true}
        className={'combineModel'}
        onOk={() => handleOk()}
        onCancel={() => onCancel()}>
        <CombineForm columns={columns} form={form}/>
      </Modal>
    </>
  )
}

export default CombineModel
