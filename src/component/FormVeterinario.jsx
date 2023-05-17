import React, { useState } from 'react';
import { getEstructuraFormVeterinario } from '../data/data-veterinario';

export const FormVeterinario = ({handler}) => {
  /** creamos el hook useState para detectar el cambio de estado del objeto de vacio a diligenciado algun campo */

  const [formVeterinario, setFormVeterinario] = useState(getEstructuraFormVeterinario);

  /** desestructuramos el objecto json para trabajar con cada uno de sus atributos */

  const { primerNombre, segundoNombre, primerAPellido, segundoApellido, especialidad } = formVeterinario;

  /** utilizamos el evento onchange para obtener los valores de los input, con la referencia del nombre del campo */

  const onInputOnchange = ({ target: { name, value } }) => {

    setFormVeterinario({
      ...formVeterinario,
      [name]: value
    });

  }

  const onSubmitFromVeterinario = (event) => {

    event.preventDefault();
    /** llenamos el hadler con los valores de los input para mostrarlos en la lista */
    handler(formVeterinario);

    /** Limpiamos los valores de los input */
    setFormVeterinario(getEstructuraFormVeterinario);

  }

  return (
    <>      
      <div className="container">
        <form className='form_pet_clinic' onSubmit={onSubmitFromVeterinario}>

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

          <label >Especialidad:
            <input type='text' name='especialidad' value={especialidad} placeholder='Especialidad' onChange={onInputOnchange} />
          </label>

          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    </>

  )
}
