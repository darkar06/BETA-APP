import { change } from '../services/noteServices'

export default function useNotes() {
  const changeNote = (data) => {
    return change(data)
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(res)
      })
  }
  return { changeNote }
}