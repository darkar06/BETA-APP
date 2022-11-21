import { useState } from "react"
const useField = (type, placeholder)=>{
  const [value,setValue] = useState("")

  const onChange = (e)=>{
    setValue(e.target.value)
  }

  return {
    type,
    onChange,
    value,
    placeholder
  }
}

export default useField