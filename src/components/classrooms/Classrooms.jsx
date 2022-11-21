import { NavLink } from "react-router-dom"
import { useUser } from "../../hooks/useUser"

export default function StudentsClassrooms({ classrooms }) {
    const { user } = useUser()
    if (!classrooms) return null
    return (
        <>
            {
                classrooms.map(res => {
                    return (
                        <NavLink key={res.id}
                            to={`/classrooms/${res.id}`} className="classroom">
                            <div>{
                                user.userType == "teacher"
                                    ? <>

                                        <h5>{res.curse + " " + res.section}</h5>
                                        <h6>{res.asignature}</h6>
                                    </>
                                    : <>

                                        <h5>{res.asignature}</h5>
                                    </>
                            }
                            </div>
                        </NavLink>
                    )
                })
            }</>
    )
}