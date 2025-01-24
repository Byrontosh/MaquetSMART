import { Route, BrowserRouter, Routes, Navigate } from 'react-router'
import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import { useEffect, useState } from 'react'
import { authFirebase, dbFirebase } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

function App() {

  const [user, setUser] = useState("")

  const [maquetas, setMaquetas] = useState([])

  const obtenerDatos = async () => {
    const snapshot = await getDocs(collection(dbFirebase, "maquetas"));
    const documentos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setMaquetas(documentos);
}

  useEffect(() => {
    authFirebase.onAuthStateChanged((user)=>{
      setUser(user)
    })
    obtenerDatos()
  }, [])
  

  return (
    <>
      <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home maquetas={maquetas}/>} />
                <Route path="/dashboard" element={user ? <Dashboard user={user.email}/>: <Navigate to="/login"/>} />
                <Route path="/login" element={user ? <Navigate to="/dashboard"/> : <Login />} />
                <Route path="/registro" element={user ? <Navigate to="/dashboard"/>: <Register />} />
              </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
