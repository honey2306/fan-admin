export const getMap = (AMap: any, adCode: any [], cityList: number [], center: any []) => {
  cityList = cityList.map((item: any) => item.city)
  let map = new AMap.Map("container", {
    mapStyle: 'amap://styles/8684af0e676654606b3faa2b88c794c4',
    zoom: 5,
    center: center,
    pitch: 0,
    viewMode: '3D'
  })

  let disProvince = new AMap.DistrictLayer.Province({
    zIndex: 12,
    adcode: adCode,
    depth: 1,
    styles: {
      'fill': (properties: any) => {
        return fillStyle(properties, '#26407E')
      },
      'province-stroke': '',
      'city-stroke': (properties: any) => {
        return fillStyle(properties, '#15C2D3')
      },
      'county-stroke': 'rgba(255,255,255,1)' // 中国区县边界
    }
  })
  disProvince.setMap(map)
  const fillStyle = (properties: any, color: string) => {
    let adcode = properties.adcode
    return (cityList.indexOf(adcode) !== -1) ? color : ''
  }
}
