export const tokenReducer = (state = null, action) => {
  const { payload, type } = action

  const Manager = {
    "@token/set_token": () => payload,
    "@token/delete_token": () => payload,
  }

  return Manager[type]
    ? Manager[type]()
    : state
}

export const setToken = (token) => {
  return {
    type: "@token/setToken",
    payload: token
  }
}

export const removeToken = () => {
  return {
    type: "@token/setToken",
    payload: null
  }
}