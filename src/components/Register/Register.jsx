import { useState } from "react";
import { NavLink } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authFirebase, dbFirebase } from "../../firebase.js";
import {setDoc, doc} from 'firebase/firestore'
import { useNavigate } from "react-router";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    
    let navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(authFirebase, email, password);
            const user = authFirebase.currentUser;
            console.log(user);
            if (user){
                await setDoc(doc(dbFirebase,"Users",user.uid),{
                    email:user.email,
                    fullname:fname,
                    rol:"admin"
                })
            }
            navigate("/login");
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
    }

    return (
        <>
            <main className="contenido-principal contenedor ">
                <h3 className="text-center">Registro</h3>
                <form className="formulario" onSubmit={handleRegister}>

                    <fieldset>

                        <legend>Ingresa tus datos</legend>

                        <div className="campo">
                            <label >Nombre: </label>
                            <input type="text" placeholder="Tu Nombre" required
                                onChange={(e) => setFname(e.target.value)}
                            />

                        </div>

                        <div className="campo">
                            <label >E-mail:</label>
                            <input type="email" placeholder="Tu Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="campo">
                            <label >Contraseña:</label>
                            <input type="password" placeholder="Tu Contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                    </fieldset>

                    <input className="btn" type="submit" value="Enviar" ></input>

                </form>

                <NavLink to="/login" className="enlace">Si ya tienes cuenta, puedes iniciar sesión aquí</NavLink>
                
            </main>
        </>
    )
}

export default Register