import { useUser } from "../../hooks/useUser"

const Box = ({ id, title, content, handleDelete }) => {
    const { user } = useUser()
    return (
        <div key={id}>
            <h4>{title}</h4>
            <h6>{content}</h6>
            {user.userType !== "student" && <button onClick={() => handleDelete(id)}>delete</button>}
        </div>
    )
}

export default Box