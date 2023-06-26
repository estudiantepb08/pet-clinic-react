import React from 'react'

export const RowDetalleVeterinario = ({ id, primerNombre, segundoNombre, primerApellido,
    segundoApellido, especialidad }) => {    
    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{primerNombre}</td>
                <td>{segundoNombre}</td>
                <td>{primerApellido}</td>
                <td>{segundoApellido}</td>
                <td>{especialidad}</td>                
            </tr>
        </>
    )
}
