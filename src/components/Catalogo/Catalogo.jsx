/* eslint-disable react/prop-types */
import './Catalogo.css';

export const Catalogo = ({ maquetas }) => {

    return (
        <main className="container">
            <div className="contenedor-proyectos">
                {
                    maquetas.map(maqueta => (
                        <div className="proyecto-casa" key={maqueta.id}>
                            <img src={maqueta.imagen} alt="Proyecto" />
                            <div className="card-content">
                                <p>{maqueta.nombre}</p>
                                <p>{maqueta.descripcion}</p>
                                <div className="rating-stars">
                                    <div className="rating">
                                        <span className="star">&#9733;</span>
                                        <span className="star">&#9733;</span>
                                        <span className="star">&#9733;</span>
                                        <span className="star">&#9733;</span>
                                        <span className="star">&#9734;</span>
                                    </div>
                                    <span>$ {maqueta.precio}</span>
                                </div>
                            </div>
                        </div>
                    ))


                }
            </div>
        </main>
    )
}
