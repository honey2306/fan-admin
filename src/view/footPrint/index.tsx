import React, { useEffect, useState } from "react"
import MapContainer from "../../components/MapContainer"
import { Button, Card, Cascader, message } from "antd"
import { handle } from "../../utils/api"
import axios from "axios"
import { PlusOutlined } from "@ant-design/icons"
import { getMap } from "./footMap"

const FootPrint = () => {
  const [options, setOptions] = useState([])
  const [tmpList, setTmpList] = useState<Array<any>>([])
  const [activeCode, setActiveCode] = useState('')
  const [cityList, setCityList] = useState([])
  const [cityAll, setCityAll] = useState([])
  const [center, setCenter] = useState([116.412427, 39.303573])
  const onChange = (val: any) => {
    const tmp = tmpList.filter((item: any) => {
      return item.value === val[ 1 ]
    })[ 0 ].center
    setCenter(tmp.split(','))
    setActiveCode(val[ 1 ])
  }

  const getOptions = () => {
    handle(axios.get('/map/city'), '获取省市信息', false, true).then((res: any) => {
      const citys = res.data.options.map((item: any) => item.children)
      const tmp: any [] = []
      citys.forEach((item: any) => {
        item.forEach((item1: any) => {
          tmp.push(item1)
        })
      })
      setTmpList(tmp)
      setOptions(res.data.options)
      setCityAll(res.data.adCodeList)
    })
  }

  const add = () => {
    handle(axios.post('/footPrint/add', { city: Number(activeCode) }), '新增足迹', true, true).then((res: any) => {
      getCityList()
    })
  }

  const del = () => {
    const data: any [] = cityList.filter((item: any) => item.city === Number(activeCode))
    if (data.length > 0) {
      handle(axios.post('/footPrint/del', { _id: data[ 0 ]._id }), '新增足迹', true, true).then(() => {
        getCityList()
      })
    } else {
      message.error('该城市暂未打卡')
    }
  }

  const getCityList = () => {
    handle(axios.get('/footPrint/list'), '获取足迹列表', false, true).then((res: any) => {
      setCityList(res.data)
    })
  }
  useEffect(() => {
    getCityList()
    getOptions()
  }, [])
  return (
    <div className={'footPrint'}>
      <Card title="足迹操作" className={'options'}>
        <Cascader className={'select'} options={options} onChange={onChange} placeholder="Please select"/>
        <Button className={'add'} onClick={() => add()} type={'primary'} icon={<PlusOutlined/>}>新增足迹</Button>
        <Button className={'del'} onClick={() => del()} danger type={'primary'}>删除足迹</Button>
      </Card>
      <div className={'map'}>
        {(cityList.length > 0 && cityAll.length > 0) &&
                  <MapContainer getMap={getMap} cityList={cityList} cityAll={cityAll} center={center}/>}
      </div>
    </div>
  )
}

export default FootPrint
