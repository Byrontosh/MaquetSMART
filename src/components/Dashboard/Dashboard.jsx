import { useEffect, useState } from "react";
import { authFirebase, dbFirebase } from "../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import './Dashboard.css';
import { ToastContainer, toast } from 'react-toastify';


// eslint-disable-next-line react/prop-types
const Dashboard = ({user}) => {

    const [form, setForm] = useState({
        nombre: "",
        imagen: "",
        precio: "",
        descripcion: ""
    })

    const [maquetas, setMaquetas] = useState([])
    const [id, setId] = useState("")
    const [cambio, setCambio] = useState(false);

    const handleLogout = async () => {
        try {
            await authFirebase.signOut()
            window.location.href = "/"
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const crearMaquetas = async (e) => {
        e.preventDefault()
        try {
            if (id){
                await updateDoc(doc(dbFirebase,"maquetas",id),form)
                setForm({})
                setId("")
                toast.success("Maqueta modificada correctamente")
            }
            else{
                await addDoc(collection(dbFirebase, "maquetas"), form)
                setForm({})
                toast.success("Maqueta agreagada correctamente")

            }
            obtenerDatos()
        } catch (error) {
            toast.error(error)
        }
    }

    const obtenerDatos = async () => {
        const snapshot = await getDocs(collection(dbFirebase, "maquetas"));
        const documentos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setMaquetas(documentos);
    }


    const eliminarDatos = async (id) => {
        const confirmar = confirm("Vas a eliminar, ¿Estás seguro?")
        if (confirmar) {
            const userDoc = doc(dbFirebase, "maquetas", id);
            await deleteDoc(userDoc);
            obtenerDatos()
            toast.success("Maqueta elimada correctamente")
        }
    }

    const cargarDatos = async (maqueta) => {
        setForm({
            nombre: maqueta.nombre,
            imagen: maqueta.imagen,
            precio: maqueta.precio,
            descripcion: maqueta.descripcion,
        })
        setId(maqueta.id)
    }


    const cambiarColor = () => {
        if (cambio) {
            document.documentElement.style.filter = 'none'
        } else {
            document.documentElement.style.filter = 'invert(1)'
        }
        setCambio(!cambio)
    }



    useEffect(() => {
        obtenerDatos()
    }, [])

    return (
        <body>
            <ToastContainer />
            <section className="header_projects">
                <p>Bienvenido - {user}</p>
                <div className="header-actions">
                    <button className="theme-toggle" onClick={cambiarColor}>🌙</button>
                    <button className="logout-btn" onClick={handleLogout}>Salir</button>
                </div>
            </section>

            <section className="container_projects">
                <section className="form-section">
                    <h4>Crear</h4>
                    <p>Módulo para crear maquetas</p>

                    <form className="route-form" onSubmit={crearMaquetas}>

                        <label>Nombre:</label>
                        <input type="text" placeholder="nombre de la maqueta"
                            name='nombre'
                            value={form.nombre || ""}
                            onChange={handleChange}
                        />

                        <label>Imagen:</label>
                        <input type="url" placeholder="url de imagen de la maqueta"
                            name='imagen'
                            value={form.imagen || ""}
                            onChange={handleChange}
                        />

                        <label>Precio:</label>
                        <input type="number" placeholder="precio de la maqueta"
                            name='precio'
                            value={form.precio || ""}
                            onChange={handleChange}
                        />

                        <label>Descripción:</label>
                        <textarea placeholder="descripión de la maqueta"
                            name='descripcion'
                            value={form.descripcion || ""}
                            onChange={handleChange}
                        />

                        <input className="btn" type="submit" value={id ?"Actualizar":"Agregar"} ></input>
                    </form>
                </section>

                <section className="routes-section">
                    <h4>Listar</h4>
                    {maquetas ? "" : <div className="no-routes">No existen registros...</div>}

                    <p>Módulo para listar maquetas</p>
                    {
                        maquetas.map((maqueta) => (
                            <div className="route-card" key={maqueta.id}>
                                <img src={maqueta.imagen} alt="maqueta" className="route-img" />
                                <div className="route-info">
                                    <p>Nombre:{maqueta.nombre}</p>
                                    <p>Precio:{maqueta.precio}</p>
                                    <p>Descripción:{maqueta.descripcion}</p>
                                </div>
                                <div className="route-actions">
                                    <button className="update-btn"
                                        onClick={() => { cargarDatos(maqueta) }}
                                    >Actualizar</button>
                                    <button className="delete-btn"
                                        onClick={() => { eliminarDatos(maqueta.id) }}
                                    >Eliminar</button>
                                </div>
                            </div>
                        ))
                    }
                </section>


            </section>
        </body>
    )
}

export default Dashboard