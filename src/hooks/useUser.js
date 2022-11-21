import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useToken from "./useToken"
import { loginUser, retriverAccout, changePassword } from "../services/userServices"
import { loginState, logoutState } from "../redux/userReducer"
import { getStudents } from "../services/studensServices"


//las request en ingles y los hooks en español :)

export const useUser = () => {
  const dispatch = useDispatch()
  let user = useSelector(store => store.user)
  const [loading, setLoading] = useState(true)
  const { changeToken } = useToken()
  // const {setToken} = useToken()
  // useEffect(()=>{
  //     if (user.token){
  //         setToken(user.token)
  //     }
  // },[])
  useEffect(() => {
    const loggedUser = localStorage.getItem("user")
    if (loggedUser) {
      let user = JSON.parse(loggedUser)
      changeToken(user.token)
    }
    setLoading(false)
  }, [])

  const logout = () => {
    window.localStorage.removeItem("user")
    dispatch(logoutState())
  }

  const login = async (email, password) => { // cambiarle el nombre a esta accion
    return await loginUser(email, password)
      .then(user => {
        if (user.error) throw user.error
        window.localStorage.setItem("user", JSON.stringify(user))
        dispatch(loginState(user))
        return user
      })
  }

  const getCurseStudents = async (curse, section) => { // cambiarle el nombre a esta accion
    return await getStudents(curse, section)
      .then(user => {
        if (user.error) throw user.error
        return user
      })
  }

  return {
    user,
    login,
    logout,
    getCurseStudents,
    loading
  }
}

export const useRetriver = () => {
  const retriverUser = async (email) => {
    return await retriverAccout(email)
      .then(res => {
        console.log(res)
        if (res.error) throw res.error
        return res
      })
  }

  const setPassword = async (password, id) => {
    return await changePassword(password, id)
      .then(res => {
        console.log(res)
        if (res.error) throw res.error
        return res
      })
  }

  return {
    setPassword,
    retriverUser
  }
}