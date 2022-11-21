import StudentsClassrooms from "../../components/classrooms/Classrooms"
import Menu from "../../components/menu/Menu"
import { useUser } from "../../hooks/useUser"
import "./Classrooms.css"
import useClassroom from "../../hooks/useClassroom"
import "./Classrooms.css"
import Togable from "../../components/Togable"
import useField from "../../hooks/useField"

const Classrooms = () => {
  const { user } = useUser()
  const { classrooms, wait } = useClassroom()

  if (wait) return "cargando..."

  console.log(user)

  return (
    <section className="classrooms">
      <h3>Classrooms</h3>
      {user.userType !== "student" && <Togable >
        <form>
          <select>
            {user.asignatures.map(res => <option key={res}>{res}</option>)}
          </select>
        </form>
      </Togable>}
      <div className="classrooms__container">
        <StudentsClassrooms classrooms={classrooms} />
      </div>
    </section>
  )
}

export default Classrooms