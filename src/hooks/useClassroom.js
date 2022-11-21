import { useEffect, useState } from "react"
import { deleteClass, getClassrooms, getClassroom } from "../services/crservices"
import { useUser } from "./useUser"


export default function useClassroom() {
  const [classrooms, setClassrooms] = useState([])
  const [wait, setWait] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    getClassrooms(user.userName).then(res => {
      setClassrooms(res)
      setWait(false)
    })
  }, [])

  const oneClassroom = async (id) => {
    setWait(true)
    const classroom = await getClassroom(id).then(res => res)
    setWait(false)
    return classroom
  }

  const deleteClassroom = async (id) => {
    setWait(true)
    const classroom = await deleteClass(id).then(res => res)
    setWait(false)
    return classroom
  }

  return { deleteClassroom, classrooms, oneClassroom, wait }
}