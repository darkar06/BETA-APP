import "./verAnuncios.css"

import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import useAnnouncements from "../../hooks/useAnnouncements"
import Menu from "../../components/menu/Menu"
import Back from "../../assets/icons/Back"
import { useNavigate } from "react-router-dom"
import Delete from "../../assets/icons/Delete"
import { useUser } from "../../hooks/useUser"



export default function VerAnuncio() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getAnnoun } = useAnnouncements()
    const [anuncio, setAnuncio] = useState(null)
    const { deleteOne } = useAnnouncements()
    const { user } = useUser()


    useEffect(() => {
        getAnnoun(id).then(res => {
            setAnuncio(res)
        })
    }, [])

    const goBack = () => {
        navigate("/noticias")
    }

    const handleDelete = async () => {
        const id = anuncio.id
        deleteOne(id).then(res => {
            navigate("/noticias")
        })
    }

    if (!anuncio) return "cargando..."

    return (
        <section className="section">
            <div className="noticia">
                <div className="img" style={{
                    backgroundImage: `url("http://localhost:3200/upload/${anuncio.background}")`
                }}>
                    <div className="actions">
                        <div className="back" onClick={goBack}>
                            <i>
                                <Back color={"var(--naranjaClaro)"} />
                            </i>
                            <span>volver</span>
                        </div>
                        {user.userType == "teacher" && <div className="delete" onClick={handleDelete}>
                            <i>
                                <Delete color={"var(--rojoClaro)"} />
                            </i>
                            <span>Delete</span>
                        </div>}
                    </div>
                </div>
                <div className="title">
                    <h2>{anuncio.title}</h2>
                </div>
                <div className="content">
                    <p>{anuncio.content}</p>
                </div>
            </div>
        </section>
    )
}