import React, { useEffect, useState} from 'react';
import { FormVeterinario } from '../component/FormVeterinario';
import { DetalleVeterinario } from '../component/DetalleVeterinario';
import { getEstructuraVeterinario } from '../data/data-veterinario';
import { getDataVeterinarioService } from '../services/dataVeterinarioService';

export const VeterinarioVista = () => {

  /** Estados iniciales de la vista principal con la data basica */

  const [activarForm, setActivarForm] = useState(false);
  const [dataVeterinario, setDataVeterinario] = useState(getEstructuraVeterinario);
  const [itemsVeterinarios, setItemsVeterinarios] = useState([]);

  /** Efecto inicial de la carga de imagenes y data */

  useEffect(() => {
    const dataVeterinario = getDataVeterinarioService();
    setDataVeterinario(dataVeterinario);
    setItemsVeterinarios(dataVeterinario);
  }, []);

  /** useEffect refresca la tabla con el nuevo registro ingresado en por el formulario */

  useEffect(() => {
    setDataVeterinario(itemsVeterinarios);
  }, [itemsVeterinarios])

  const onActiveForm = () => {
    setActivarForm(!activarForm);
  };

  /** Handler encargado de recibir la data del formulario y clonar la lista anterior y agregarle los nuevos registros */

  const handlerItemsVeterinarios = ({ primerNombre, segundoNombre, primerApellido, segundoApellido, especialidad }) => {

    setItemsVeterinarios([...itemsVeterinarios, {

      id: itemsVeterinarios.length + 1,
      primerNombre: primerNombre,
      segundoNombre: segundoNombre,
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      especialidad: especialidad
    }]);
    //console.log(itemsPropietarios);
  }

  return (
    <>
      <div className='container'>
        <div className='card my-3'>
          <div className='card-header'>
            Datos Propietario
          </div>
          <div className='card-body'>
            <div className='row my-4'>
              <div className='col'>
                <DetalleVeterinario veterinarioData={dataVeterinario} />
              </div>
              <div className='col'>
                <button className="btn btn-secondary" onClick={onActiveForm}>{!activarForm ? 'Crear propietario' : 'Ocultar formulario'}</button>
                {!activarForm ? '' : <FormVeterinario handler={(newVeterinario) => handlerItemsVeterinarios(newVeterinario)} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
