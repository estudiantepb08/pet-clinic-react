import React, { useState } from 'react';
import { getEstructuraFormPropietario } from '../data/data-propietario';

export const FormPropietario = ({ handler }) => {

  /** creamos el hook useState para detectar el cambio de estado del objeto de vacio a diligenciado algun campo */

  const[formPropietario, setFormPropietario] = useState(getEstructuraFormPropietario);

  /** desestructuramos el objecto json para trabajar con cada uno de sus atributos */

  const {primerNombre, segundoNombre, primerAPellido, segundoApellido, telefono, direccion, correo} = formPropietario;

  /** utilizamos el evento onchange para obtener los valores de los input, con la referencia del nombre del campo */

  const onInputOnchange = ({ target: { name, value } })=>{

    setFormPropietario({
      ...formPropietario,
      [name]: value
    });

  }

  const onSubmitFromPropietario = (event) =>{
    
    event.preventDefault();
/** llenamos el hadler con los valores de los input para mostrarlos en la lista */
    handler(formPropietario);

/** Limpiamos los valores de los input */
    setFormPropietario(getEstructuraFormPropietario);
    
  }
  
  return (
    <>
      <div className="container">
        <form className='form_pet_clinic' onSubmit={onSubmitFromPropietario}>

          <label >Primer Nombre:
            <input type='text' name='primerNombre' value={primerNombre} placeholder='Primer Nombre' onChange={onInputOnchange} />
          </label>

          <label >Segundo Nombre:
            <input type='text' name='segundoNombre' value={segundoNombre} placeholder='Segundo Nombre' onChange={onInputOnchange} />
          </label>

          <label >Primer Apellido:
            <input type='text' name='primerAPellido' value={primerAPellido} placeholder='Primer Apellido' onChange={onInputOnchange} />
          </label>

          <label >Segundo Apellido:
            <input type='text' name='segundoApellido' value={segundoApellido} placeholder='Segundo Apellido' onChange={onInputOnchange} />
          </label>

          <label >Telefono:
            <input type='text' name='telefono' value={telefono} placeholder='Telefono' onChange={onInputOnchange} />
          </label>

          <label >Dirección:
            <input type='text' name='direccion' value={direccion} placeholder='Dirección' onChange={onInputOnchange} />
          </label>
          <label >Correo:
            <input type='text' name='correo' value={correo} placeholder='Correo' onChange={onInputOnchange} />
          </label>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    </>
  )
}
