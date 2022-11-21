import "./anuncio.css"
import { NavLink } from "react-router-dom"
import { useUser } from "../hooks/useUser"


export default function Anuncio({ anuncios, handleDelete }) {
    const { user } = useUser()

    return (
        <>
            {
                anuncios.map(res => <div className="anuncio" key={res.id}>
                    <NavLink to={`/noticias/${res.id}`} >
                        <img src={`http://localhost:3200/upload/${res.background}`} />
                        <h4>{res.title}</h4>
                        <p>{res.content}</p>
                    </NavLink>
                    {
                        user.userType !== "student"
                            ? <button onClick={() => handleDelete(res.id)}>Eliminar</button>
                            : ""
                    }
                </div>
                )
            }
        </>
    )
}