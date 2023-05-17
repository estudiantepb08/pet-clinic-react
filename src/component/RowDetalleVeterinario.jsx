import React from 'react'

export const RowDetalleVeterinario = ({ id, primerNombre, segundoNombre, primerAPellido,
    segundoApellido, especialidad }) => {    
    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{primerNombre}</td>
                <td>{segundoNombre}</td>
                <td>{primerAPellido}</td>
                <td>{segundoApellido}</td>
                <td>{especialidad}</td>                
            </tr>
        </>
    )
}
