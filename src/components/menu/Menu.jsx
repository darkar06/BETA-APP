import { useState, useRef } from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom"
import './menu.css'
import image from "../../assets/ramses.jpg"
import Bars from "../../assets/icons/Menu.jsx"
import Cancel from "../../assets/icons/Cancel.jsx"
import Exit from "../../assets/icons/Exit.jsx"
import Inicio from "../../assets/icons/Inicio.jsx"
import Anuncio from "../../assets/icons/Anuncio"
import Calificaciones from "../../assets/icons/Calificaciones"
import Ajustes from "../../assets/icons/Ajustes"
import Classroom from "../../assets/icons/Classroom"
import { useUser } from '../../hooks/useUser'
import { rewriteURIForGET } from '@apollo/client'
import Me from '../Me'

export default function Menu() {
  const [active, setActive] = useState(false)
  const { logout, user, loading } = useUser()
  const menu = useRef()
  const navigate = useNavigate()

  const changeActive = () => {
    setActive(!active)
    menu.current.classList.toggle("active")
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (loading) return "cargando"

  return (

    <header className='menu' ref={menu}>
      <div className='top'>
        <div className='btn' onClick={changeActive}>
          {
            active ? <i><Cancel color={"var(--negro1)"} /></i> : <i><Bars color={"var(--negro1)"} /></i>
          }
          <h4>BETA APP</h4>
        </div>
        <Me />
      </div>
      <nav className='navegacion'>
        <ul>
          <li>
            <NavLink to="/home" style={({ isActive }) => ({
              background: isActive ? "var(--negro1)" : "none",
              color: isActive ? "var(--azulClaro)" : "black"
            })} >
              <i>
                <Inicio color={"currentColor"} />
              </i>
              <span>INICIO</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/noticias" style={({ isActive }) => ({
              background: isActive ? "var(--negro1)" : "none",
              color: isActive ? "var(--azulClaro)" : "black"
            })} >
              <i>
                <Anuncio color={"currentColor"} />
              </i>
              <span>NOTICIAS</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/calificaciones" style={({ isActive }) => ({
              background: isActive ? "var(--negro1)" : "none",
              color: isActive ? "var(--azulClaro)" : "black"
            })} >
              <i>
                <Calificaciones color={"currentColor"} />
              </i>
              <span>CALIFICACIONES</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/classrooms" style={({ isActive }) => ({
              background: isActive ? "var(--negro1)" : "none",
              color: isActive ? "var(--azulClaro)" : "black"
            })} >
              <i>
                <Classroom color={"currentColor"} />
              </i>
              <span>CLASES</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/ajustes" style={({ isActive }) => ({
              background: isActive ? "var(--negro1)" : "none",
              color: isActive ? "var(--azulClaro)" : "black"
            })} >
              <i>
                <Ajustes color={"currentColor"} />
              </i>
              <span>AJUSTES</span>
            </NavLink>
          </li>

          {
            user && user.userType == "admin" && <li>
              <NavLink to="/admin/manager" style={({ isActive }) => ({
                background: isActive ? "var(--negro1)" : "none",
                color: isActive ? "var(--azulClaro)" : "black"
              })} >
                <i>
                  <Ajustes color={"currentColor"} />
                </i>
                <span>ADMIN</span>
              </NavLink>
            </li>
          }
        </ul>
      </nav>
      <div className='exit' onClick={handleLogout}>
        <i>
          <Exit color="var(--rojoClaro)" />
        </i>
        <h5>CERRAR SESION</h5>
      </div>
    </header>
  )
}