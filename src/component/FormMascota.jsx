import React, { useState } from 'react';
import { estructuraFormMascota } from '../data/data-mascota';
import { Form } from 'react-bootstrap';

export const FormMascota = ({handler, dataTipoMascota, listPropietarios}) => {

  const[formularioEstructura, setFormularioEstructura] = useState(estructuraFormMascota);
  const{nombreMascota, fechaNacimiento, propietario,tipoMascota} = formularioEstructura;

  const onChangeInput = ({target:{name, value}})=>{
    console.log({value,name})
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
            <Form.Group>
                                              <Form.Label>Mascota</Form.Label>
                                              <Form.Control
                                                type="date"
                                                name="fechaNacimiento"
                                                value={fechaNacimiento}
                                                onChange={onChangeInput}
                                              />
                                            </Form.Group>
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
