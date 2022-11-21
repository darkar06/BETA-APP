import { useState } from "react"
import { useUser } from "../../hooks/useUser"
import { Link, useNavigate } from "react-router-dom"
import "./login.css"
import Alert from "../../components/alert/Alert"
import useField from "../../hooks/useField"

export default function Login() {
    const email = useField("email", "ingrese su email")
    const password = useField("password", "ingrese su contraseña")
    const { login } = useUser()
    const navigate = useNavigate()
    const [error, setError] = useState(null)


    const handleLogin = async (e) => {
        e.preventDefault()

        const user = await login(email.value, password.value)
            .catch(err => {
                console.log(err)
                setError(err)
                setTimeout(() => {
                    setError(null)
                }, 10000);
            })

        if (user) navigate("/noticias")
    }

    const handleClick = () => {
        setError(null)
    }

    return (
        <div className="login">
            <div className="form__box">
                <h3>Iniciar sesion</h3>
                <form onSubmit={handleLogin}>
                    <input {...email} />
                    <input {...password} />
                    <button>login</button>
                </form>
                <Link to="/recuperacion">¿Olvidaste tu contraseña?</Link>
            </div>

            {
                error ? <Alert error={error} handleClick={handleClick} />
                    : ""
            }
        </div>
    )
}


