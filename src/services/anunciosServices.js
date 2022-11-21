const tokenManager = () => {
  const loggedUser = localStorage.getItem("user")
  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    const token = user.token
    return token && "Bearer " + token
  }

  return null
}

export const getAllAnnoun = () => {

  return fetch("http://localhost:3200/api/announcements/", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "authorization": `${tokenManager()}`
    }
  }).then(res => res.json())
}


export const getClassroom = (id) => {

  return fetch(`http://localhost:3200/api/announcements/classroom/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "authorization": `${tokenManager()}`
    }
  }).then(res => res.json())
}


export const createAnnoun = (data) => {

  return fetch("http://localhost:3200/api/announcements/", {
    method: "POST",
    headers: {
      "authorization": `${tokenManager()}`,
    },
    body: data
  }).then(res => res.json())
}

export const deleteAnnoun = (id) => {

  return fetch("http://localhost:3200/api/announcements/", {
    method: "DELETE",
    headers: {
      "authorization": `${tokenManager()}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({ id })
  }).then(res => res.json())
}

export const getOneAnnoun = (id) => {

  return fetch("http://localhost:3200/api/announcements/" + id).then(res => res.json())
}


