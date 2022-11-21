import "./classroom.css"

import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate, useParams } from "react-router-dom"
import Menu from "../../components/menu/Menu"
import Back from "../../assets/icons/Back"
import Delete from "../../assets/icons/Delete"
import { useUser } from "../../hooks/useUser"
import useClassroom from "../../hooks/useClassroom"
import Togable from "../../components/Togable"
import CrearAnuncios from "../../components/crearAnuncios/CrearAnuncio"
import useAnnouncements from "../../hooks/useAnnouncements"
import useHomework from "../../hooks/useHomework"
import CrearTarea from "../../components/crearTarea/CrearTarea"
import useField from "../../hooks/useField"
import useNotes from "../../hooks/useNotes"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentScore } from "../../redux/scoreReducer"

//en estos en vez de pasar los datos deberia pasar la id para que sea el mismo componente el que los busque
//ej, le paso la id del classroom
//hago una ruta para que busque todos los datos que posean un classroom con esa id


const ClassroomTareas = ({ id = null }) => {
  const [tareas, setTareas] = useState(null)
  const { deleteOne, getHomework, wait } = useHomework()

  useEffect(() => {
    getHomework(id).then(res => {
      console.log(res)

      setTareas(res)
    })
  }, [])


  const handleDelete = (id) => {
    deleteOne(id).then(res => {
      console.log(res)
      const filter = tareas.filter(filtro => filtro.id !== id)
      setTareas(filter)
    })
  }


  console.log(tareas)
  const { user } = useUser()

  if (wait) return "cargando..."
  return (
    <div>
      {user.userType !== "student" && <Togable><CrearTarea id={id} /></Togable>}
      <div>
        {
          tareas.map(res => {
            return (<div key={res.id}>

              <Link to={`/classrooms/homework/${res.id}`}>
                <h4>{res.title}</h4>
                <h6>{res.content}</h6>
              </Link>

              {user.userType !== "student" && <button onClick={() => handleDelete(res.id)}>delete</button>}
            </div>
            )
          })
        }
      </div>
    </div>
  )
}

export const Scores = () => {
  const navigate = useNavigate()
  const score = useSelector(res => res.score)
  const dispatch = useDispatch()
  console.log(score)
  if (!score) return "no se ha podido entrar a esta opcion"
  const { changeNote } = useNotes()
  const [p1, setP1] = useState(score.periods.p1)
  const [p2, setP2] = useState(score.periods.p2)
  const [p3, setP3] = useState(score.periods.p3)
  const [p4, setP4] = useState(score.periods.p4)

  const handleSubmit = e => {
    e.preventDefault()
    console.log(score)
    const objectToSend = {
      "p1": p1 || 0,
      "p2": p2 || 0,
      "p3": p3 || 0,
      "p4": p4 || 0,
      "id": score.id
    }
    console.log(objectToSend)
    changeNote(objectToSend)
      .then(res => {
        console.log(res)
        dispatch(
          setCurrentScore(res))
      })
      .catch(err => console.log(err))
  }

  console.log(score)
  return (

    <form onSubmit={handleSubmit}>
      <input name="p1" placeholder="p1" value={p1} onChange={e => setP1(e.target.value)} />
      <input name="p2" placeholder="p2" value={p2} onChange={e => setP2(e.target.value)} />
      <input name="p3" placeholder="p3" value={p3} onChange={e => setP3(e.target.value)} />
      <input name="p4" placeholder="p4" value={p4} onChange={e => setP4(e.target.value)} />
      <button>send</button>
    </form>
  )
}

const ClassroomAlumnos = ({ section, curse, asignature }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [students, setStudents] = useState(null)
  const { getCurseStudents } = useUser()

  useEffect(() => {
    getCurseStudents(curse, section)
      .then(res => {
        console.log(res)
        setStudents(res)
      })
  }, [])

  if (students == null) return "cargando"

  return (
    <div>
      {students.map(res => {
        const score = res.scores.find(res => res.asignature == asignature)
        console.log(score.id)

        const handleClick = e => {
          console.log(score)
          dispatch(
            setCurrentScore(score))
          navigate("/score")
        }

        return (
          <div onClick={handleClick}>
            <h3>{res.name}</h3>
            <h6>{res.userName}  </h6>
            <div>
              <span>{score.periods.p1}    </span>
              <span>{score.periods.p2}    </span>
              <span>{score.periods.p3}    </span>
              <span>{score.periods.p4}    </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function VerAnuncio() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { deleteClassroom, oneClassroom, wait } = useClassroom()
  const [classroom, setClassroom] = useState(null)
  const { user } = useUser()
  const [currentArea, setCurrentArea] = useState("anuncios")


  useEffect(() => {
    oneClassroom(id).then(res => {
      console.log(res)
      setClassroom(res)
    })
  }, [])

  const goBack = () => {
    navigate("/classrooms")
  }

  const handleDelete = async () => {
    const id = classroom.id
    deleteClassroom(id).then(res => {
      console.log(res)
      if (res.error) throw res.error
      navigate("/classrooms")
    }).catch(err => console.log(err))
  }

  console.log(classroom)

  if (wait) return "cargando..."

  return (
    <section className="classroom">
      <div className="img" >
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
        <div className="margen">
          <h2>{classroom.asignature}</h2>
          <ul className="nav">
            <li onClick={() => setCurrentArea("anuncios")}>
              <i>

              </i>
              <span>
                anuncios
              </span>
            </li>
            <li onClick={() => setCurrentArea("tareas")}>
              <i>

              </i>
              <span>
                tareas
              </span>
            </li>
            {user.userType !== "student" &&
              <li onClick={() => setCurrentArea("alumnos")}>
                <i>

                </i>
                <span>
                  alumnos
                </span>
              </li>
            }
          </ul>
        </div>
      </div>
      <div className="content">
        {currentArea == "anuncios" && <CrearAnuncios id={classroom.id} />}
        {currentArea == "tareas" && <ClassroomTareas id={classroom.id} />}
        {currentArea == "alumnos" && <ClassroomAlumnos curse={classroom.curse} section={classroom.section} asignature={classroom.asignature} />}
      </div>
    </section>
  )
}