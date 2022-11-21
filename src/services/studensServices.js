const tokenManager = () => {
  const loggedUser = localStorage.getItem("user")
  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    const token = user.token
    return token && "Bearer " + token
  }

  return null
}

export function getStudents(curse, section) {
  console.log(section, curse)
  return fetch("http://localhost:3200/api/student/find/curse", {
    method: "POST",
    headers: { "content-type": "application/json", "authorization": tokenManager() },
    body: JSON.stringify({
      section, curse
    })
  })
    .then(res => res.json())
}