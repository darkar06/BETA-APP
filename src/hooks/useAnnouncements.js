import { getClassroom, getAllAnnoun, createAnnoun, deleteAnnoun, getOneAnnoun } from "../services/anunciosServices"
import { useEffect, useState } from "react"

export default function useAnnouncements() {
  const [anuncios, setAnuncios] = useState([])

  useEffect(() => {
    getAllAnnoun().then(res => {
      setAnuncios(res)
    })
  }, [])

  const create = (data) => {
    const res = createAnnoun(data).then(res => {
      if (res.error) throw res.error
      return res
    })
    return res
  }

  const deleteOne = async (id) => {
    const res = await deleteAnnoun(id)
    return res
  }

  const getAnnoun = async (id) => {
    const anuncio = await getOneAnnoun(id)
    return anuncio
  }

  const getClassroomAnnoun = async (id) => {
    return await getClassroom(id)
  }

  return {
    anuncios,
    create,
    deleteOne,
    getAnnoun,
    getClassroomAnnoun
  }
}