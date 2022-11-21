import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import { useUser } from './hooks/useUser'

import Recuperacion from './pages/recuperacion/Recuperacion'
import ChangePassword from './pages/change_password/ChangePassword'
import Home from './pages/home/Home'
import Classrooms from './pages/classroom/Classrooms'
import Calificaciones from './pages/calificaciones/Calificaciones'
import Ajustes from './pages/ajustes/Ajustes'
import Anuncios from './pages/anuncios/Anuncios'
import Login from './pages/login/Login'
import Redireccion from './components/Redireccion'
import CreateAnnouncement from "./pages/createAnnouncement/CreateAnnouncement"
import VerAnuncio from "./pages/ver_anuncio/VerAnuncio"
import Classroom, { Scores } from "./pages/ver_classroom/Classroom"
import Menu from "./components/menu/Menu"
import Homework from "./pages/ver_tareas/Homework"


export default function RouterManager() {
  const { user, loading } = useUser()
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={
          <Redireccion>
            <Navigate to="home" />
          </Redireccion>
        } />

        <Route path='/home' element={
          loading
            ? "cargando"
            : user
              ? <Home />
              : "necesitas loguearte para poder acceder a estas secciones de la pagina "
        } />

        <Route path='/noticias' element={
          <Redireccion>
            <Anuncios />
          </Redireccion>
        } />

        <Route path='/calificaciones' element={
          <Redireccion>
            <Calificaciones />
          </Redireccion>
        } />

        <Route path='/classrooms' element={
          <Redireccion>
            <Classrooms />
          </Redireccion>
        } />

        <Route path='/classrooms/:id' element={
          <Redireccion>
            <Classroom />
          </Redireccion>
        } />

        <Route path='/classrooms/homework/:id' element={
          loading
            ? "cargando"
            : user
              ? <Homework />
              : "necesitas loguearte para poder acceder a estas secciones de la pagina "
        } />

        <Route path='/ajustes' element={
          <Redireccion>
            <Ajustes />
          </Redireccion>
        } />

        <Route path='/me' element={
          <Redireccion>
            <h1>me</h1>
          </Redireccion>
        } />

        <Route path='/recuperacion/contrasena/:id' element={user ? <Navigate to="/home" /> : <ChangePassword />} />
        <Route path='/noticias/:id' element={!user ? <Navigate to="/home" /> : <VerAnuncio />} />
        <Route path='/recuperacion' element={user ? <Navigate to="/home" /> : <Recuperacion />} />

        <Route path='/login' element={user ? <Navigate to="/home" /> : <Login />} />

        <Route path='/score' element={<Scores />} />

        <Route path='/noticias/create/' element={
          user?.userType == "student"
            ? <Navigate to="/noticias" />
            : <CreateAnnouncement />
        } />

      </Routes>

      <Menu />


    </BrowserRouter>
  )
}