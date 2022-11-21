const tokenManager = () => {
  const loggedUser = localStorage.getItem("user")
  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    const token = user.token
    return token && "Bearer " + token
  }

  return null
}

export function getClassrooms(userName) {
  return fetch("http://localhost:3200/api/classroom/myclass/" + userName)
    .then(res => res.json())
}

export function getClassroom(id) {
  return fetch("http://localhost:3200/api/classroom/" + id)
    .then(res => res.json())
}


export function deleteClass(id) {
  return fetch("http://localhost:3200/api/classroom/" + id, {
    method: "DELETE",
    headers: { "authorization": tokenManager() }
  })
    .then(res => res.json())
}