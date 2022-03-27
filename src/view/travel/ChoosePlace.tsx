import React, { useEffect, useState } from "react"
import { Input, Modal, Table } from "antd"
import { handle } from "../../utils/api"
import axios from "axios"
import { columns } from "./placeConfig"

const ChoosePlace = (props: any) => {
  const [place, setPlace] = useState<any>({})
  const [canConfirm, setCanConfirm] = useState<any>(false)
  const [data, setData] = useState<any>([])
  const choose = (value: any) => {
    const activePlace = data.filter((item: any) => item.id === value[ 0 ])[ 0 ]
    setPlace({
      name: activePlace.name,
      location: activePlace.location,
      pname: activePlace.pname
    })
  }

  const { modalVisible = false, handleOk, handleCancel } = props

  const getSearchInfo = (e: any) => {
    if (e.keyCode === 13 && e.target.value) {
      handle(axios.get(`/map/search?keywords=${e.target.value}`), '获取搜索信息', false, true).then((res: any) => {
        setData(res.data)
      })
    }
  }

  const rowSelection: any = {
    type: 'radio',
    onChange: choose
  }

  useEffect(() => {
    setCanConfirm(Object.prototype.hasOwnProperty.call(place, 'name'))
  }, [place])
  return (
    <Modal title="选择地点" visible={modalVisible} onOk={() => handleOk(place)} onCancel={handleCancel}
      okButtonProps={{ disabled: !canConfirm }}
      className={'choosePlaceModel'}>
      <label>输入关键字进行搜索</label>
      <Input onKeyDown={(e) => getSearchInfo(e)}/>
      {data.length > 0 &&
              <Table columns={columns()} dataSource={data}
                rowKey={'id'}
                pagination={false} className={'detailTable'}
                rowSelection={rowSelection}/>}
    </Modal>
  )
}

export default ChoosePlace
