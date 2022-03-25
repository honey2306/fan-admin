import React, { useEffect } from "react"
import AMapLoader from '@amap/amap-jsapi-loader'
import '../../style/view/footPrint/MapContainer.less'

const MapContainer = () => {
  let map: any = null
  useEffect(() => {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: '769b953018b287654137d7cfc24d1058'
    }
    AMapLoader.load({
      key: "5779bd434326e996c7bbe88e1efb7d89", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0",              // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['']               // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap: any) => {


      var adCode = [340000, 130000]
      var depth = 1
      map = new AMap.Map("container", {
        mapStyle: 'amap://styles/grey',
        zoom: 5,
        center: [116.412427, 39.303573],
        pitch: 0,
        viewMode: '3D'
      })

      let disProvince = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: adCode,
        depth: depth,
        styles: {
          'fill': function (properties: any) {
            // properties为可用于做样式映射的字段，包含
            // NAME_CHN:中文名称
            // adcode_pro
            // adcode_cit
            // adcode
            var adcode = properties.NAME_CHN
            return (adcode === '石家庄市' || adcode === '合肥市' || adcode === '安庆市') ? '#26407E' : ''
          },
          'province-stroke': '',
          'city-stroke': function (properties: any) {
            // properties为可用于做样式映射的字段，包含
            // NAME_CHN:中文名称
            // adcode_pro
            // adcode_cit
            // adcode
            var adcode = properties.NAME_CHN
            return (adcode === '石家庄市' || adcode === '合肥市' || adcode === '安庆市') ? '#15C2D3' : ''
          }, // 中国地级市边界
          'county-stroke': 'rgba(255,255,255,1)' // 中国区县边界
        }
      })
      disProvince.setMap(map)

      var colors: any = {}
      var getColorByAdcode = function (adcode: any) {
        if (!colors[ adcode ]) {
          var gb = Math.random() * 155 + 50
          colors[ adcode ] = 'rgb(' + gb + ',' + gb + ',255)'
        }
        console.log(colors[ adcode ])
        return colors[ adcode ]
      }
    }).catch(e => {
      console.log(e)
    })
  }, [])
  return (
    <div id={'container'} className={'map'} style={{ height: '800px' }}/>
  )
}

export default MapContainer
