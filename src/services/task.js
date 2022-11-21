const tokenManager = () => {
  const loggedUser = localStorage.getItem("user")
  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    const token = user.token
    return token && "Bearer " + token
  }

  return null
}


export const sendAtask = data => {
  return fetch("http://localhost:3200/api/task", {
    method: "POST",
    body: data,
    headers: { "authorization": tokenManager() }
  })
    .then(res => res.json())
}

export const fetchAllTask = (id) => {
  return fetch(`http://localhost:3200/api/task/homework/${id}`, {
    method: "GET",
    headers: { "authorization": tokenManager() }
  }).then(res => res.json())
}