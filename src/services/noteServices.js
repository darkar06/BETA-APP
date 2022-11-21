
const tokenManager = () => {
  const loggedUser = localStorage.getItem("user")
  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    const token = user.token
    return token && "Bearer " + token
  }

  return null
}

export const change = data => {
  return fetch("http://localhost:3200/api/score", {
    method: "PUT",
    headers: { "authorization": tokenManager(), "content-type": "application/json" },
    body: JSON.stringify(data)
  })
}