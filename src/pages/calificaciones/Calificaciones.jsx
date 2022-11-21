import Menu from "../../components/menu/Menu"
import useClassroom from "../../hooks/useClassroom"
import "./calificaciones.css"
import useStudent from "../../hooks/useStudents"
import { useUser } from "../../hooks/useUser"
import { useEffect } from "react"

const getPromedy = (promedio) => {
    if (promedio?.p4) {
        return Math.round((promedio.p1 + promedio.p2 + promedio.p3 + promedio.p4) / 4)
    }
    else if (promedio?.p3) {
        return Math.round((promedio.p1 + promedio.p2 + promedio.p3) / 3)
    }
    else if (promedio?.p2) {
        return Math.round((promedio.p1 + promedio.p2) / 2)
    }
    else if (promedio?.p1) {
        return promedio.p1
    }

    return null
}

const Calificaciones = () => {
    const { getCurseStudents } = useStudent()
    const { user } = useUser()

    useEffect(() => {
        if (user && user.userType == "teacher") {
            getCurseStudents(user.curses[0])
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
    }, [])

    return null

    return (
        <section className="section">
            <Menu />
            <div className="calificaciones">
                <h3>Calificaciones</h3>
                <div className="calificaciones__container">
                    <div className="table__title">
                        <span>Materia</span>
                        <div className="periods">
                            <span title="sep oct nov">1ra</span>
                            <span title="dic en feb">2da</span>
                            <span title="marz abr">3ra</span>
                            <span title="may jun">4ta</span>
                        </div>
                        <span>Promedio final</span>
                    </div>
                    <div className="tabla">
                        {
                            calificacion
                                ? calificacion.map(res => {
                                    return (
                                        <div className="campos">
                                            <span>{res.asignature}</span>
                                            <div>
                                                <span title="sep oct nov">{res.periods.p1}</span>
                                                <span title="dic en feb">{res.periods.p2}</span>
                                                <span title="marz abr">{res.periods.p3}</span>
                                                <span title="may jun">{res.periods.p4}</span>
                                            </div>
                                            <span>{getPromedy(res.periods)}</span>
                                        </div>
                                    )
                                })
                                : "no hay ninguna calificacion aun "
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Calificaciones