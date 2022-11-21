import { Link } from "react-router-dom"
import { useUser } from "../hooks/useUser"

const Me = () => {
    const { user } = useUser()
    return (
        <Link to={user ? "/me" : "/login"} className='info'>
            <img />
            {
                user

                    ? <span>{user.name.toUpperCase()}</span>
                    : "iniciar sesion"
            }
        </Link>
    )
}

export default Me