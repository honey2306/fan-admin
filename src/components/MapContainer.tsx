import React, { useEffect, useState } from "react"
import AMapLoader from '@amap/amap-jsapi-loader'
import '../style/view/footPrint/MapContainer.less'

const MapContainer = (props: any) => {
  const { getMap, cityAll, cityList, center } = props
  const [Amap, setAMap] = useState(null)
  useEffect(() => {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: '769b953018b287654137d7cfc24d1058'
    }
    AMapLoader.load({
      key: "5779bd434326e996c7bbe88e1efb7d89", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0",              // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['']               // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap: any) => {
      setAMap(AMap)
    }).catch(e => {
      console.log(e)
    })
  }, [])

  useEffect(() => {
    Amap && getMap(Amap, cityAll, cityList, center)
  }, [Amap, cityList, center])
  return (
    <div id={'container'} className={'map'}/>
  )
}

export default MapContainer
