import "./anuncios.css"
import { useEffect, useState } from "react"
import Cancel from "../../assets/icons/Cancel"
import SRC from "../../assets/escuela.jpg"
import Menu from "../../components/menu/Menu"
import { useUser } from "../../hooks/useUser"
import { Link } from "react-router-dom"
import useAnnouncements from "../../hooks/useAnnouncements"
import Anuncio from "../../components/Anuncio"


const etiquetas = [
    "aventura",
    "esperanzas",
    "amor",
    "odio",
    "comida"
]


export default function Anuncios() {
    const { user } = useUser()
    const { deleteOne } = useAnnouncements()
    const [value, setValue] = useState("")
    const { anuncios } = useAnnouncements()
    const [allAnuncios, setAllAnuncios] = useState([])
    const [filter, setFilter] = useState([])
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        setAllAnuncios(anuncios)
        setFilter(anuncios)
        setLoading(true)
    }, [anuncios])

    const handleDelete = async (id) => {
        deleteOne(id).then(res => {
            console.log(res)
            const deleteFilter = filter.filter(res => res.id != id)
            const deleteElements = allAnuncios.filter(res => res.id != id)
            setFilter(deleteFilter)
            setAllAnuncios(deleteElements)
        })
    }

    const handleFind = (e) => {
        e.preventDefault()
        const anunciosFiltrados = allAnuncios.filter(res => res.title.includes(value))
        if (anunciosFiltrados.length == 0) console.log("no se ha encontrado el elemento")
        setFilter(anunciosFiltrados)
    }


    const deleteValue = e => {
        console.log("A")
        setValue("")
        setAllAnuncios(anuncios)
        setFilter(anuncios)
    }

    const changeFilter = e => {
        const valor = e.target.value
        setValue(valor)
    }


    if (!user) return "cargando"

    console.log(user)

    return (
        <>
            <section className="anuncios" >
                <h3>Anuncios</h3>
                {
                    user.userType !== "student"
                        ? <Link to="/noticias/create"><button>crear</button></Link>
                        : ""
                }
                <form className="search__box" onSubmit={handleFind}>
                    <input type="text" placeholder="ingrese el titulo de la noticias" onChange={changeFilter} value={value} />
                    <i onClick={deleteValue}>
                        {
                            value.length > 0 ? <Cancel color="currentColor" /> : ""
                        }
                    </i>
                    <button>Buscar</button>
                </form>
                <div className={filter.length > 0 ? "anuncios__container" : "vacio"}>
                    {
                        !loading && filter.length > 0
                            ? <h2>aun no hay noticias</h2>
                            : <Anuncio anuncios={filter} handleDelete={handleDelete} />
                    }
                </div>
            </section>
        </>
    )
}