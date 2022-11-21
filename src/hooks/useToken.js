import { useDispatch, useSelector } from "react-redux"
import { setToken } from "../redux/tokenReducer.js"

export default function useToken() {
  const token = useSelector(store => store.token)
  const dispatch = useDispatch()

  const changeToken = (token) => {
    dispatch(setToken(token))
  }

  return {
    token,
    changeToken
  }
}