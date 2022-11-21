export const loginUser = (email, password) => {
  return fetch("http://localhost:3200/api/login",{
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
      email,
      password
    })
  }).then(res=> res.json())
}

export const retriverAccout = (email) => {
  return fetch("http://localhost:3200/api/login/recuperacion",{
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({ email })
  }).then(res=> res.json())
}

export const changePassword = (password,id) => {
  return fetch("http://localhost:3200/api/login/password",{
    method: "PUT",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({password,id})
  }).then(res=> res.json())
}