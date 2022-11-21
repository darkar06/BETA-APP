import useAnnouncements from "../../hooks/useAnnouncements"
import Menu from "../../components/menu/Menu"
import useField from "../../hooks/useField"
import Alert from "../../components/alert/Alert"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useHomework from "../../hooks/useHomework"


function CrearTarea({ id = null }) {
    const file = useField("file", "ingrese el titulo")
    const title = useField("text", "ingrese el titulo")
    const content = useField("text", "ingrese el contenido")
    const { create } = useHomework()
    const [alert, setAlert] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        if (id) formData.set("id", id)
        console.log(formData)
        await create(formData).catch(err => {
            setError(err)
        })

        setAlert("anuncio creado")

    }

    const goBack = () => {
        setAlert(null)
    }
    return (
        <div>
            <div>
                <h3>Crear</h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input {...file} name="myfile" />
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

    )
}

export default CrearTarea