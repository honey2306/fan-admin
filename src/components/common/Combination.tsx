import React, { useRef } from "react"
import CombineTable from "./CombineTable"
import { Button } from "antd"
import CombineModel from "./CombineModel"

const Combination = (props: any) => {
  const { data, columns, txtList } = props
  const modelRef: any = useRef()
  const showModel = () => {
    modelRef.current.showModal(true)
  }
  return (
    <>
      <Button onClick={() => showModel()}>{txtList.add}</Button>
      <CombineTable data={data} columns={columns}/>
      <CombineModel ref={modelRef} data={data} columns={columns} txtList={txtList}/>
    </>
  )
}

export default Combination
