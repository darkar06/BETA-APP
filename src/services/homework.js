
const tokenManager = () => {
  const loggedUser = localStorage.getItem("user")
  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    const token = user.token
    return token && "Bearer " + token
  }

  return null
}

export const getAllHomeworks = (id) => {
  return fetch(`http://localhost:3200/api/homework/classroom/${id}`)
    .then(res => res.json())
}

export const getAHomework = (id) => {
  return fetch(`http://localhost:3200/api/homework/${id}`)
    .then(res => res.json())
}

export const createHomework = (data) => {
  return fetch("http://localhost:3200/api/homework/", {
    method: "POST",
    headers: {
      "authorization": `${tokenManager()}`,
    },
    body: data
  }).then(res => res.json())
}

export const deleteHomework = (id) => {
  return fetch("http://localhost:3200/api/homework/" + id, {
    method: "DELETE",
    headers: {
      "authorization": `${tokenManager()}`,
    }
  }).then(res => res.json())
}