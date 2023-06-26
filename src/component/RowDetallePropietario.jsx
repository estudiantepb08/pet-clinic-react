import React from 'react'

/*<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
  ...   <button className='btn btn-danger' onClick={()=>handlerDeleteOwnerItem(id)}>edit</button>
</div>*/

export const RowDetallePropietario = ({ id, primerNombre, segundoNombre, primerApellido,
    segundoApellido, telefono, direccion, correo, handlerDeleteOwnerItem}) => {

    
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
                <td><button className='btn btn-danger' onClick={()=>handlerDeleteOwnerItem(id)}>eliminar</button></td>
            </tr>
        </>
    )
}
