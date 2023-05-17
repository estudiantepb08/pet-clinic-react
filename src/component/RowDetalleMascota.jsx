import React from 'react'

export const RowDetalleMascota = ({ id, nombreMascota, fechaNacimiento}) => {

    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{nombreMascota}</td>
                <td>{fechaNacimiento}</td>                                
            </tr>
        </>
    )
}