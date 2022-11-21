import { Link } from "react-router-dom"
import useField from "../../hooks/useField"
import "./recuperacion.css"
import Alert from "../../components/alert/Alert"
import { useState } from "react"
import { useRetriver } from "../../hooks/useUser"


export default function Recuperacion() {
    const email = useField("email", "ingrese su email")
    const { retriverUser } = useRetriver()
    const [message, setMessage] = useState()
    const [error, setError] = useState()

    const sendEmail = async (e) => {
        e.preventDefault()

        const info = await retriverUser(email.value).catch(err => {
            console.log(err)
            setError(err)
            setTimeout(() => {
                setError(null)
            }, 10000);
        })

        setMessage(info.message)
    }

    const redireccion = () => {
        window.open("https://gmail.com")
    }

    const clearError = () => {
        setError(null)
    }


    return (
        <section className="recuperacion">
            <div className="form__box">
                <h3>Recuperar cuenta</h3>
                <p>ingresa tu nombre completo y tu direccion de correo electronico para poder recuperar tu cuenta</p>
                <form onSubmit={sendEmail}>
                    <input {...email} />
                    <button>Recuperar</button>
                </form>
                <Link to="/login">volver</Link>
            </div>
            {
                error ?
                    <Alert error={error} handleClick={clearError} />
                    : message ?
                        <Alert message={message} handleClick={redireccion} />
                        : ""
            }
        </section>
    )
}