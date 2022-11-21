export const userReducer = (state = JSON.parse(localStorage.getItem("user")), action) => {
  const { payload, type } = action

  const Manager = {
    "@user/login": () => payload,
    "@user/logout": () => payload,
  }

  return Manager[type]
    ? Manager[type]()
    : state
}

export const loginState = (user) => {
  return {
    type: "@user/login",
    payload: {
      ...user
    }
  }
}

export const logoutState = () => {
  return {
    type: "@user/logout",
    payload: null
  }
}