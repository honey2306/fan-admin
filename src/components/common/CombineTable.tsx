import React, { useEffect, useState } from "react"
import { Table } from "antd"

const CombineTable = (props: any) => {
  const { defer, columns, refresh } = props
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 10
  })
  const change = (page: number) => {
    setPageInfo((pageInfo) => ({
      ...pageInfo,
      page: page
    }))
  }

  const pageSizeChange = (page: number, pageSize: number) => {
    setPageInfo({
      page: 1,
      pageSize: pageSize
    })
  }

  const getData = () => {
    defer(pageInfo).then((res: any) => {
      setData(res.data.data)
      setTotal(res.data.total)
    })
  }

  useEffect(() => {
    getData()
  }, [refresh, pageInfo])


  return (
    <Table className={'combine-table'} rowKey={'_id'} dataSource={data} columns={columns}
      pagination={{
        current: pageInfo.page,
        pageSize: pageInfo.pageSize,
        position: ['bottomCenter'], showSizeChanger: true,
        showTotal: () => `共${total}条`,
        total: total,
        onChange: (page: number) => change(page),
        onShowSizeChange: (page: number, pageSize: number) => pageSizeChange(page, pageSize)
      }}/>
  )
}

export default CombineTable
