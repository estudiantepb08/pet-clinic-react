import React from 'react'

export const RowDetallePropietario = ({ id, primerNombre, segundoNombre, primerApellido,
    segundoApellido, telefono, direccion, correo }) => {

    /*<td><button className='btn btn-danger' onClick={()=>handlerDeleteItem(id)}>eliminar</button></td>*/
    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{primerNombre}</td>
                <td>{segundoNombre}</td>
                <td>{primerApellido}</td>
                <td>{segundoApellido}</td>
                <td>{telefono}</td>
                <td>{direccion}</td>
                <td>{correo}</td>
            </tr>
        </>
    )
}
