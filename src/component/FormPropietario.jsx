import React, { useEffect, useState } from 'react';
import { getEstructuraFormPropietario } from '../data/data-propietario';

export const FormPropietario = ({ handler,ownerToEdit }) => {

  /** creamos el hook useState para detectar el cambio de estado del objeto de vacio a diligenciado algun campo */
 
  const[formPropietario, setFormPropietario] = useState(getEstructuraFormPropietario);

  /** desestructuramos el objecto json para trabajar con cada uno de sus atributos */

  const {primerNombre, segundoNombre, primerApellido, segundoApellido, telefono, direccion, correo} = formPropietario;

  /** utilizamos el evento onchange para obtener los valores de los input, con la referencia del nombre del campo */

  const onInputOnchange = ({ target: { name, value } })=>{

    setFormPropietario({
      ...formPropietario,
      [name]: value
    });
 
  }
  const  fillForm = () => {
    console.log(ownerToEdit);
    if(ownerToEdit){
      setFormPropietario(ownerToEdit);
    }
  }
  useEffect(() => {
    fillForm();
  },[ownerToEdit])
  const onSubmitFromPropietario = (event) =>{
    
    event.preventDefault();
    let action;
/** llenamos el hadler con los valores de los input para mostrarlos en la lista */
    (!ownerToEdit) ? action = 'save' : action = 'edit'
    handler(formPropietario,action);

/** Limpiamos los valores de los input */
    setFormPropietario(getEstructuraFormPropietario);
    
  }
  
  return (
    <>
      <div className="container">

        <form className='form_pet_clinic border border-success gap-4' onSubmit={onSubmitFromPropietario}>
        <fieldset>
          <h1>{!ownerToEdit ? "Añadir Propieatrio" : "Editar Propietario"}</h1>
        <div className='d-flex justify-content-between flex-column'>
          <label >Primer Nombre:
          </label>
            <input type='text' name='primerNombre' value={primerNombre} placeholder='Primer Nombre' onChange={onInputOnchange} />
        </div>
        <div className='d-flex justify-content-between flex-column'>
          <label >Segundo Nombre:
          </label>
            <input type='text' name='segundoNombre' value={segundoNombre} placeholder='Segundo Nombre' onChange={onInputOnchange} />
        </div>
        <div className='d-flex justify-content-between flex-column'>
          <label >Primer Apellido:
          </label>
            <input type='text' name='primerApellido' value={primerApellido} placeholder='Primer Apellido' onChange={onInputOnchange} />
        </div>

        <div className='d-flex justify-content-between flex-column'>
          <label >Segundo Apellido:
          </label>
            <input type='text' name='segundoApellido' value={segundoApellido} placeholder='Segundo Apellido' onChange={onInputOnchange} />
        </div>

        <div className='d-flex justify-content-between flex-column'>
          <label >Telefono:
          </label>
            <input type='text' name='telefono' value={telefono} placeholder='Telefono' onChange={onInputOnchange} />
        </div>

        <div className='d-flex justify-content-between flex-column'>
          <label >Dirección:
          </label>          
            <input type='text' name='direccion' value={direccion} placeholder='Dirección' onChange={onInputOnchange} />
        </div>
        <div className='d-flex justify-content-between flex-column'>
          <label >Correo:
          </label>
            <input type='text' name='correo' value={correo} placeholder='Correo' onChange={onInputOnchange} />
        </div>
          <button type="submit" className="btn btn-primary">{!ownerToEdit ? "Crear Propietario" : "Editar Propietario"}</button>
        </fieldset>
        </form>
      </div>
    </>
  )
}
