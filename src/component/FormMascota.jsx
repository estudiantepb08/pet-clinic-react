import React, { useState } from 'react';
import { estructuraFormMascota } from '../data/data-mascota';

export const FormMascota = ({handler, dataTipoMascota, listPropietarios}) => {

  const[formularioEstructura, setFormularioEstructura] = useState(estructuraFormMascota);
  const{nombreMascota, fechaNacimiento, propietario,tipoMascota} = formularioEstructura;

  const onChangeInput = ({target:{name, value}})=>{
    setFormularioEstructura({...formularioEstructura, 
      [name]: value});
  };

  console.log(dataTipoMascota);

  const onFormSubmitMascota = (event)=>{
    event.preventDefault();
    handler(formularioEstructura);
  }

  return (
    <>
      <div className="container">
        <div className='my-4'>
          <form className='w-70 form_pet_clinic' onSubmit={onFormSubmitMascota}>
          
          <label >Tipo Mascota:
              <select value={tipoMascota} onChange={onChangeInput} name='tipoMascota' multiple={false}>
                <option value={'default'}>Seleccione</option>
                {dataTipoMascota.map(({id, tipoMascota}) => <option key={id} value={id}>{tipoMascota}</option>)}
              </select>
            </label>

            <label>Nombre Mascota:
              <input type='text' name='nombreMascota' value={nombreMascota} placeholder='Nombre Mascota' onChange={onChangeInput}/>
            </label>

            <label >Fecha Nacimiento:
              <input type='text' name='fechaNacimiento' value={fechaNacimiento} placeholder='Fecha Nacimiento' onChange={onChangeInput}/>
            </label>
            <label >Propietarios:
              <select value={propietario} onChange={onChangeInput} name='propietario' multiple={false}>
                <option value={'default'}>Seleccione</option>
                {listPropietarios.map(({id, propietario}) => <option key={id} value={id}>{propietario}</option>)}
              </select>
            </label>     

            <button type="submit" className="btn btn-primary my-2">Create</button>
          </form>
        </div>
      </div>
    </>
  )
}
