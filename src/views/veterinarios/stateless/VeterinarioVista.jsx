import React, { useEffect, useState} from 'react';
import { FormVeterinario } from '../../../component/FormVeterinario';
import { DetalleVeterinario } from '../../../component/DetalleVeterinario';

export const VeterinarioVista = ({data}) => {
  /** Estados iniciales de la vista principal con la data basica */
  const [activarForm, setActivarForm] = useState(false);
  const [dataVeterinario, setDataVeterinario] = useState([]);
  const [itemsVeterinarios, setItemsVeterinarios] = useState([]);

  /** Efecto inicial de la carga de imagenes y data */

  useEffect(() => {
    setDataVeterinario(data);
    setItemsVeterinarios(data);
    console.log(dataVeterinario);
  }, []);

  /** useEffect refresca la tabla con el nuevo registro ingresado en por el formulario */

  useEffect(() => {
    setDataVeterinario(data);
    setItemsVeterinarios(data);
    console.log(dataVeterinario,"DATA VETE");
  }, [])

  const onActiveForm = () => {
    setActivarForm(!activarForm);
  };

  /** Handler encargado de recibir la data del formulario y clonar la lista anterior y agregarle los nuevos registros */

  const handlerItemsVeterinarios = ({ primerNombre, segundoNombre, primerAPellido, segundoApellido, especialidad }) => {

    setItemsVeterinarios([...itemsVeterinarios, {

      id: itemsVeterinarios.length + 1,
      primerNombre: primerNombre,
      segundoNombre: segundoNombre,
      primerAPellido: primerAPellido,
      segundoApellido: segundoApellido,
      especialidad: especialidad
    }]);
    //console.log(itemsPropietarios);
  }

  return (
    <>
    <section>
      <div className='container'>
        <div className='card my-3'>
          <div className='card-header'>
            Datos Veterinario
          </div>
          <div className='card-body'>
            <div className='row my-4'>
              <div className='col'>
              <DetalleVeterinario veterinarioData={data} />

              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
      <section>
      <div className='col'>
                <button className="btn btn-secondary" onClick={onActiveForm}>{!activarForm ? 'Crear veterinario' : 'Ocultar formulario'}</button>
                {!activarForm ? '' : <FormVeterinario handler={(newVeterinario) => handlerItemsVeterinarios(newVeterinario)} />}
              </div>
      </section>
    </>

  )
}
