import { useEffect, useState } from "react"
import { getStudents } from "../services/studensServices"

export default function useStudent() {

  const getCurseStudents = (curse) => {
    return getStudents(curse)
      .then(res => {
        if (res.error) throw res.error
        return res
      })
  }
  return {
    getCurseStudents
  }
}