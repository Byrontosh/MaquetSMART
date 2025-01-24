import { useState } from "react"
import './Login.css'

import { NavLink, useNavigate } from "react-router";
import { authFirebase } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(authFirebase,email,password)
            console.log("Usuario incia sesión ");
            navigate('/dashboard')
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    return (
        <>
            <main className="contenido-principal contenedor ">
                <h3 className="text-center">Inicio de sesión</h3>

                <form className="formulario" onSubmit={handleSubmit}>

                    <fieldset>

                        <legend>Ingresa tus datos</legend>

                        <div className="campo">
                            <label >E-mail: </label>
                            <input type="mail" placeholder="Tu Email" required 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>

                        <div className="campo">
                            <label >Password:</label>
                            <input type="password" placeholder="Tu Password" 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                    </fieldset>

                    <input className="btn" type="submit" value="Enviar" ></input>
                </form>

                <NavLink to="/registro" className="enlace">Si no tienes cuenta, puedes registrarte aquí</NavLink>
            </main>

        </>
    )
}

export default Login