import React, { forwardRef, useImperativeHandle, useState } from "react"
import CombineTable from "./CombineTable"
import CombineModel from "./CombineModel"

const Combination = (props: any, ref: any) => {
  const { defer, columns, txtList, addOrEdit, modelShow, onCancel, tableSlot, isAdd, formData } = props
  const [refresh, setRefresh] = useState(0)
  useImperativeHandle(ref, () => ({
    refresh: () => {
      refreshFn()
    }
  }))

  const refreshFn = () => {
    setRefresh(refresh + 1)
  }

  return (
    <div className={'combination'}>
      {tableSlot}
      <CombineTable defer={defer} columns={columns} refresh={refresh}/>
      <CombineModel columns={columns} txtList={txtList}
        addOrEdit={addOrEdit}
        onCancel={onCancel}
        modelShow={modelShow}
        isAdd={isAdd}
        formData={formData}
        refresh={refreshFn}
      />
    </div>
  )
}

export default forwardRef(Combination)
