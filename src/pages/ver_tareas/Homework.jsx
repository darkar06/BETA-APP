import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useHomework from "../../hooks/useHomework"
import useTask from "../../hooks/useTask"
import { useUser } from "../../hooks/useUser"
import useField from "../../hooks/useField"

const SendTask = ({ handleSubmit, students }) => {
    const [names, setNames] = useState([])
    const file = useField("file", "enviar")
    const { user } = useUser()

    useEffect(() => {
        setNames(students.map(res => res.student.name))

    }, [])

    const enviar = async (e) => {
        e.preventDefault()
        const res = await handleSubmit(e)
        if (res.message) setNames([...names, user.name])
    }
    return (
        <div>
            <form encType="multipart/form-data" onSubmit={enviar}>
                {
                    names.includes(user.name)
                        ? "entregada"
                        : <>
                            <input {...file} name="myfile" />
                            <button>enviar</button></>
                }
            </form>
        </div>
    )
}

const StudentsManager = ({ id }) => {
    const [task, setTask] = useState(null)
    const { getAllTask } = useTask()

    useEffect(() => {
        getAllTask(id).then(res => {
            setTask(res)
        })
    }, [])

    if (!task) return "cargando..."


    return (
        <div>
            {task.map(res => {
                console.log(res.documentURI)
                return (
                    <div>

                        <h5>{res.student.name}</h5>
                        <span>90</span>
                        {res.documentURI &&
                            <a download href={`http://localhost:3200/upload/${res.documentURI}`}>descargar</a>}
                    </div>
                )
            })

            }
        </div >
    )
}

const Homework = () => {
    const [homework, setHomework] = useState(null)
    const id = useParams().id
    const { getOneHomework, wait } = useHomework()
    const { user } = useUser()
    const { sendTask } = useTask()

    useEffect(() => {
        getOneHomework(id).then(res => {
            console.log(res)
            setHomework(res)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.set("id", homework.id)
        const res = await sendTask(formData)
            .catch(err => {
                console.log(err)
            })
        return res
    }

    if (wait) return "cargando"

    return (
        <section className="homework">
            <h2>{homework.title}</h2>
            <div>
                <p>{homework.content}</p>
                <div>
                    {homework.document
                        ?
                        <a download href={"http://localhost:3200/upload/" + homework.document}>descargar</a>
                        : ""}
                </div>
            </div>
            {
                user.userType == "student" && <SendTask handleSubmit={handleSubmit} students={homework.receivedBy} />
            }
            {
                user.userType == "teacher" && <StudentsManager id={homework.id} />
            }
        </section>
    )
}

export default Homework