import { sendAtask, fetchAllTask } from "../services/task"


export default function useTask() {
  const sendTask = data => {
    return sendAtask(data).then(res => {
      if (res.error) throw new Error(res.error)
      return res
    })
  }

  const getAllTask = (id) => {
    return fetchAllTask(id).then(res => {
      if (res.error) throw new Error(res.error)
      return res
    })
  }

  return { sendTask, getAllTask }
}


