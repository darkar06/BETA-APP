import { useEffect, useState } from "react"
import { deleteHomework, getAHomework, createHomework, getAllHomeworks } from "../services/homework"

export default function useHomework() {
  const [homeworks, setHomeworks] = useState([])
  const [wait, setWait] = useState(true)

  const getHomework = async (id) => {
    setWait(true)
    const res = await getAllHomeworks(id)
    setWait(false)
    return res
  }

  const getOneHomework = async (id) => {
    setWait(true)
    const res = await getAHomework(id)
    setWait(false)
    return res
  }

  const create = async (data) => {
    setWait(true)
    const res = await createHomework(data)
    setWait(false)
    return res
  }

  const deleteOne = async (data) => {
    setWait(true)
    const res = await deleteHomework(data)
    setWait(false)
    return res
  }

  return {
    deleteOne,
    getHomework,
    create,
    wait,
    getOneHomework
  }
}