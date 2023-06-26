import React, { useEffect, useState} from 'react';
import { FormVeterinario2 } from '../../../component/FormVeterinario2';
import { DetalleVeterinario } from '../../../component/DetalleVeterinario';

export const VeterinarioVista = ({data}) => {
  /** Estados iniciales de la vista principal con la data basica */
  const [activarForm, setActivarForm] = useState(false);
  const [dataVeterinario, setVeterinarioData] = useState([]);
  const [itemsVeterinarios, setItemsVeterinarios] = useState([]);
 const [valuesForm, setValuesForm] = useState();




  /** useEffect refresca la tabla con el nuevo registro ingresado en por el formulario */

  useEffect(() => {
    setVeterinarioData(data);
    setItemsVeterinarios(data);
  }, [data])

  const onActiveForm = (action ="") => {
    if(action === "save"){setValuesForm(undefined)}
    setActivarForm(!activarForm);
  };


  /** Handler encargado de recibir la data del formulario y clonar la lista anterior y agregarle los nuevos registros */

  const handlerItemsVeterinarios = ({ primerNombre, segundoNombre, primerAPellido, segundoApellido, especialidad ,setItemsVeterinarios}) => {
    console.log("SE LLENO ESTE HP");
    
    setItemsVeterinarios([...itemsVeterinarios, {

      id: itemsVeterinarios.length + 1,
      primerNombre: primerNombre,
      segundoNombre: segundoNombre,
      primerAPellido: primerAPellido,
      segundoApellido: segundoApellido,
      especialidad: especialidad
    }]);
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
              <DetalleVeterinario veterinarioData={data} activeForm={onActiveForm} stateForm={activarForm} addValuesFormState={setValuesForm} setVeterinarioData={setVeterinarioData} setItemsVeterinarios={setItemsVeterinarios} />

              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
      <section>
      <div className='col'>
                <button className="btn btn-secondary"  onClick={() => onActiveForm("save")}>{!activarForm ? 'Crear veterinario' : 'Ocultar formulario'}</button>
                {!activarForm ? '' : <FormVeterinario2 handler={(newVeterinario) => handlerItemsVeterinarios(newVeterinario)} valuesVeterinaryEdit={valuesForm} activeForm={onActiveForm} stateForm={activarForm} setItemsVeterinarios={setItemsVeterinarios}/>}
              </div>
      </section>
    </>

  )
}
