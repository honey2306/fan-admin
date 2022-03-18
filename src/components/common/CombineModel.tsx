import React, { forwardRef, useImperativeHandle, useState } from "react"
import { Form, message, Modal } from "antd"
import CombineForm from "./CombineForm"

const CombineModel = (props: any, ref: any) => {
  useImperativeHandle(ref, () => ({
    showModal: (isAdd: boolean) => {
      setIsAdd(isAdd)
      setIsModalVisible(true)
    }
  }))
  const { data, columns, txtList, addOrEdit } = props
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isAdd, setIsAdd] = useState(true)
  const [form] = Form.useForm()
  const handleOk = () => {
    form.validateFields().then((values: any) => {
      addOrEdit(isAdd, values).then(() => {
        handleCancel()
      })
    }).catch(() => {
      message.error('请先完成选项后再提交')
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      <Modal title={isAdd ? txtList.add : txtList.edit}
        visible={isModalVisible}
        destroyOnClose={true}
        className={'combineModel'}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}>
        <CombineForm data={data} columns={columns} form={form}/>
      </Modal>
    </>
  )
}

export default forwardRef(CombineModel)
