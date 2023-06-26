import React from 'react'

export const RowDetalleMascota = ({ id, nombreMascota, fechaNacimiento, propietario, tipoMascota, handlerDeletePetItem}) => {

    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{nombreMascota}</td>
                <td>{fechaNacimiento}</td>  
                <td>{propietario}</td>
                <td>{tipoMascota}</td>
                <td><button className='btn btn-danger' onClick={() => handlerDeletePetItem(id)}>Eliminar</button></td>
            </tr>
        </>
    )
}