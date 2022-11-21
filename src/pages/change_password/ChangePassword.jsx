import useField from "../../hooks/useField"
import { Navigate, useParams, Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Alert from "../../components/alert/Alert"
import "./changePassword.css"
import { useRetriver } from "../../hooks/useUser"

const ChangePassword = () => {
    const password = useField("password", "ingrse la nueva contraseña")
    const password2 = useField("password", "confirme la nueva contraseña")
    const params = useParams()
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const { setPassword } = useRetriver()
    const navigate = useNavigate()

    if (params.id == null) return <Navigate to="/home" />

    const getErrors = (error) => {
        setError(error)
        setTimeout(() => {
            setError(null)
        }, 10000)
    }

    const changePassword = async (e) => {
        e.preventDefault()
        console.log("A")

        if (password.value !== password2.value) return getErrors("las contraseñas no coinciden, intente de nuevo")
        else if (password.value.length < 8 || password2.value.length < 8) return getErrors("las contraseñas deben tener un minimo de caracteres de 8 para ser validas")

        const info = await setPassword(password.value, params.id).catch(err => getErrors(err))
        console.log("A")
        setMessage(info.message)
    }

    const redireccion = () => {
        navigate("/login")
    }

    const clearError = () => {
        setError(null)
    }

    return (
        <section className="change__password">
            <div className="form__box">
                <h3>cambiar contraseña</h3>
                <p>Ingrese su nueva contraseña</p>
                <form onSubmit={changePassword}>
                    <input {...password} />
                    <input {...password2} />
                    <button>cambiar</button>
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

export default ChangePassword