import { createStore } from "redux"
import reducer from "./reducer"
import { initStore } from "./sotre"

let store: any
export default () => {
  return (store = createStore(reducer, initStore))
}

export const getStore = () => {
  return store
}
