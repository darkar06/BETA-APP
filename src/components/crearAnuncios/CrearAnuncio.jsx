import Togable from "../Togable"
import { useUser } from "../../hooks/useUser"
import useAnnouncements from "../../hooks/useAnnouncements"
import Menu from "../../components/menu/Menu"
import useField from "../../hooks/useField"
import Alert from "../../components/alert/Alert"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import Box from "../anuncio/Box"



const ClassroomAnuncios = ({ id }) => {
    const title = useField("text", "ingrese el titulo")
    const content = useField("text", "ingrese el contenido")
    const { user } = useUser()
    const { create, getClassroomAnnoun, deleteOne } = useAnnouncements()
    const [alert, setAlert] = useState(null)
    const [error, setError] = useState(null)
    const [allAnuncios, setAllAnuncios] = useState([])

    useEffect(() => {
        getClassroomAnnoun(id).then(res => {
            setAllAnuncios(res)
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        if (id) formData.set("id", id)

        const a = await create(formData)
            .catch(err => {
                setError(err)
            })

        setAllAnuncios([...allAnuncios, a])
        setAlert("anuncio creado")
    }

    const goBack = () => {
        setAlert(null)
    }

    const handleDelete = (id) => {
        deleteOne(id).then(res => {
            console.log(res)
            const filter = allAnuncios.filter(filtro => filtro.id !== id)
            setAllAnuncios(filter)
        })
    }


    return (
        <div>
            {user.userType !== "student" &&
                <Togable>
                    <div>
                        <div>
                            <h3>Crear</h3>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input {...title} name="title" />
                                <input {...content} name="content" />
                                <button>crear</button>
                            </form>
                        </div>
                        {
                            alert !== null
                                ?
                                <Alert handleClick={goBack} message={alert} />
                                : error !== null
                                    ? <Alert handleClick={() => setError(null)} error={error} />
                                    : ""
                        }
                    </div>
                </Togable>}
            <div>{
                allAnuncios.map(res =>
                    <Box
                        id={res.id}
                        title={res.title}
                        content={res.content}
                        handleDelete={handleDelete}
                    />)
            }</div>
        </div>
    )
}

export default ClassroomAnuncios