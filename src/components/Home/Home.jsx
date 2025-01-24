import './Home.css';
import AppStoreImage from '../../assets/appstore.png'; // Ajusta la ruta según la ubicación del archivo
import GooglePlayImage from '../../assets/googleplay.png';
import FuturisticImage from '../../assets/Group 2.png';
import School1 from '../../assets/Escuela1.webp';
import School2 from '../../assets/Escuela2.webp';
import School3 from '../../assets/Escuela3.webp';
import School7 from '../../assets/Escuela7.webp';

import { NavLink } from "react-router";
import { Catalogo } from '../Catalogo/Catalogo';


// eslint-disable-next-line react/prop-types
const Home = ({maquetas}) => {
    return (
        <>
            <header className="container__menu">
                <h1>Maquet<span className="container__site">Smart</span></h1>
                <nav className="container__nav">
                    <a href="#">Inicio</a>
                    <a href="#nosotros">Nosotros</a>
                    <a href="#">Galería</a>
                    <a href="#">Planes</a>
                    <a href="#">Preguntas Frecuentes</a>
                    <a href="#">Proforma</a>
                    <a href="#nosotros">Contacto</a>
                </nav>
                <nav>
                    <NavLink to="/login" className="button header__button-login">Inicio de sesión</NavLink>
                </nav>
            </header>

            <main>
                <section className="hero">
                    <div className="hero__content">
                        <h2 className="hero__title">Maquetas 3D futuristas</h2>
                        <p className="hero__subtitle">Tenemos todo lo necesario, para todo tipo de proyectos escolares y de cualquier materia.</p>
                        <p className="hero__description">La imaginación la pones TÚ.</p>
                        <div className="hero__buttons">
                            <a href="#" className="button">¡Cotiza la tuya!</a>
                            <a href="#" className="button">Contáctanos</a>
                        </div>
                        <p className="hero__contact">Encuéntranos en:</p>
                        <div className="hero__download-buttons">
                            <a href="#">
                                <img src={AppStoreImage} alt="App Store" />
                            </a>
                            <a href="#">
                                <img src={GooglePlayImage} alt="Google Play" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <img src={FuturisticImage} alt="Maqueta futurista" />
                    </div>
                </section>
            </main>

            <section className="container text-center" id="nosotros">
                <div className="servicios">
                    <h2 className="titulo-servicios">Recomendados por</h2>
                    <div className="linea" />
                </div>
            </section>

            <main className="container">
                <div className="contenedor-escuelas">
                    <img src={School1} alt="School 1" />
                    <img src={School2} alt="School 2" />
                    <img src={School3} alt="School 3" />
                    <img src={School7} alt="School 7" />
                </div>
            </main>

            <section className="container">
                <div className="proyectos">
                    <h3 className="titulo-proyectos">Catálogo comercial</h3>
                </div>
                <main className="container">
                    <Catalogo maquetas={maquetas}/>
                </main>
            </section>

            <section className="container">
                <div className="promociones">
                    <h3 className="promociones">Promociones</h3>
                    <main className="container">
                        
                    </main>
                </div>
            </section>
        </>
    );
}

export default Home;
