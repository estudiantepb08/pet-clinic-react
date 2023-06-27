import React, { useState } from 'react';
import { estructuraFormMascota } from '../data/data-mascota';
import { Form } from 'react-bootstrap';

export const FormMascota = ({ handler, dataTipoMascota, listPropietarios }) => {

  const [formularioEstructura, setFormularioEstructura] = useState(estructuraFormMascota);
  const { nombreMascota, fechaNacimiento, propietario, tipoMascota } = formularioEstructura;

  const onChangeInput = ({ target: { name, value } }) => {
    console.log({ value, name })
    setFormularioEstructura({
      ...formularioEstructura,
      [name]: value
    });
  };

  console.log(dataTipoMascota);

  const onFormSubmitMascota = (event) => {
    event.preventDefault();
    handler(formularioEstructura);
  }

  return (
    <>
      <div className="container">
        <div className='my-4'>
          <form className='w-70 form_pet_clinic gap-4 border-success' onSubmit={onFormSubmitMascota}>
        <h1>AÑADIR MASCOTA</h1>
            <div className='d-flex justify-content-between flex-column'>
              <label >Tipo Mascota:
              </label>
                <select value={tipoMascota} onChange={onChangeInput} name='tipoMascota' multiple={false}>
                  <option value={'default'}>Seleccione</option>
                  {dataTipoMascota.map(({ id, tipoMascota }) => <option key={id} value={id}>{tipoMascota}</option>)}
                </select>
            </div>

            <div className='d-flex justify-content-between flex-column'>

              <label>Nombre
              </label>
                <input type='text' name='nombreMascota' value={nombreMascota} placeholder='Nombre Mascota' onChange={onChangeInput} />
            </div>

            <div className='d-flex justify-content-between flex-column'>

              <Form.Group>
                <Form.Label>Fecha Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaNacimiento"
                  value={fechaNacimiento}
                  onChange={onChangeInput}
                />
              </Form.Group>
            </div>
            <div className='d-flex justify-content-between flex-column'>
              <label >Propietarios:
              </label>
                <select value={propietario} onChange={onChangeInput} name='propietario' multiple={false}>
                  <option value={'default'}>Seleccione</option>
                  {listPropietarios.map(({ id, propietario }) => <option key={id} value={id}>{propietario}</option>)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary my-2">Create</button>
          </form>
        </div>
      </div>
    </>
  )
}
