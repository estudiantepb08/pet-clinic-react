import React from 'react'
import { FormPropietario } from '../component/FormPropietario';
import { DetallePropietario } from '../component/DetallePropietario';
import { getDataPropietarioService, savePropietario } from '../services/dataPropietarioService';
import { getEstructuraPropietario } from '../data/data-propietario';
import { useEffect, useState } from 'react';
import { useFetch } from '../common/useFetch';

export const PropietarioVista = () => {

    /** Estados iniciales de la vista principal con la data basica */

    const [activarForm, setActivarForm] = useState(false);
    const [dataPropietario, setDataPropietario] = useState(getEstructuraPropietario);
    const [itemsPropietarios, setItemsPropietarios] = useState([]);

    const { data, error, ok} = useFetch("http://localhost:8762/ms-buscador/v1/pet-clinic/propietarios");    

    /** Efecto inicial de la carga de imagenes y data */

    useEffect(() => {
        const dataItems = getDataPropietarioService(data);        
        setDataPropietario(dataItems);
        setItemsPropietarios(dataItems);  
      }, [data]);    

    /** useEffect refresca la tabla con el nuevo registro ingresado en por el formulario */

    //console.log(getDataPropietarioService);

    useEffect(() => {
        setDataPropietario(itemsPropietarios);       
    }, [itemsPropietarios]);    

    const onActiveForm = () => {
        setActivarForm(!activarForm);
    };

    /** Handler encargado de recibir la data del formulario y clonar la lista anterior y agregarle los nuevos registros */

    const handlerItemsPropietarios = async({ primerNombre, segundoNombre, primerApellido, segundoApellido, telefono, direccion, correo }) => {


        const datosPropietarios = {

            primerNombre: primerNombre,
            segundoNombre: segundoNombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            contacto:
            {
                telefono: telefono,
                direccion: direccion,
                correoElectronico: correo
            }
        }

       const mensaje = await savePropietario (datosPropietarios);

       if(mensaje.messages === 'Ok'){

        setItemsPropietarios([...itemsPropietarios, {

            id: mensaje.id,
            primerNombre: primerNombre,
            segundoNombre: segundoNombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            telefono: telefono,
            direccion: direccion,
            correo: correo
        }]);

       }/*else{
        setItemsPropietarios(itemsPropietarios);
       }*/

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
                        
                        <button className="btn btn-secondary" onClick={onActiveForm}>{!activarForm ? 'Crear propietario' : 'Ocultar formulario'}</button>
                        {!activarForm ? '' : <FormPropietario handler={(newPropietario) => handlerItemsPropietarios(newPropietario)} />}

                        <div className='row my-4'>
                            <div className='col'>
                                <DetallePropietario dataPropietarios={dataPropietario} />
                            </div>
                            <div className='col'> </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
