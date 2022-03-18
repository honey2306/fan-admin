import React from "react"
import { Table } from "antd"

const CombineTable = (props: any) => {
  const { data, columns } = props
  return (
    <Table dataSource={data} columns={columns}/>
  )
}

export default CombineTable
