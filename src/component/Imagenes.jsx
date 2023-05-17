import React from 'react'

export const Imagenes = ({ imagen, titulo, descripcion }) => {
    return (
        <>
            <div className="col">
                <div className="card My-card">
                    <img src={imagen} className="card-img-top" alt={imagen} />
                    <div className="card-body">
                        <h5 className="card-title">{titulo}</h5>
                        <p className="card-text">{descripcion}</p>
                    </div>
                </div>
            </div>            
        </>
    )
}
