import React from 'react'
import { FormPropietario } from '../component/FormPropietario';
import { DetallePropietario } from '../component/DetallePropietario';
import { getDataPropietarioService } from '../services/dataPropietarioService';
import { getEstructuraPropietario } from '../data/data-propietario';
import { useEffect, useState } from 'react';


export const PropietarioVista = () => {

    /** Estados iniciales de la vista principal con la data basica */

    const [activarForm, setActivarForm] = useState(false);
    const [dataPropietario, setDataPropietario] = useState(/*getEstructuraPropietario*/[]);
    const [itemsPropietarios, setItemsPropietarios] = useState([]);

    const { data, error, ok} = useFe

    /** Efecto inicial de la carga de imagenes y data */

    /*const propietariodata = async() =>{

        const datas = await  getDataPropietarioService();

        return datas;
    } */

    useEffect(() => {
        /*const getdataPropietario = */
        const prueba = propietariodata();
        setDataPropietario(/*getdataPropietario*/ prueba);
        setItemsPropietarios(/*getdataPropietario*/ prueba);
        console.log(prueba);
    }, []);

    /** useEffect refresca la tabla con el nuevo registro ingresado en por el formulario */

    //console.log(getDataPropietarioService);

    useEffect(() => {
        setDataPropietario(itemsPropietarios);
    }, [itemsPropietarios])

    const onActiveForm = () => {
        setActivarForm(!activarForm);
    };

    /** Handler encargado de recibir la data del formulario y clonar la lista anterior y agregarle los nuevos registros */

    const handlerItemsPropietarios = ({ primerNombre, segundoNombre, primerAPellido, segundoApellido, telefono, direccion, correo }) => {

        setItemsPropietarios([...itemsPropietarios, {

            id: itemsPropietarios.length + 1,
            primerNombre: primerNombre,
            segundoNombre: segundoNombre,
            primerAPellido: primerAPellido,
            segundoApellido: segundoApellido,
            telefono: telefono,
            direccion: direccion,
            correo: correo
        }]);

        //console.log(itemsPropietarios);

        /* 
                                <div className='row my-4'>
                            <div className='col'>
                                <DetallePropietario dataPropietarios={dataPropietario} />
                            </div>

                        </div>
        */
    }

    return (
        <>
            <div className='container'>
                <div className='card my-3'>
                    <div className='card-header'>
                        Datos Propietario
                    </div>
                    <div className='card-body'>
                        <div className='col'> </div>
                        <button className="btn btn-secondary" onClick={onActiveForm}>{!activarForm ? 'Crear propietario' : 'Ocultar formulario'}</button>
                        {!activarForm ? '' : <FormPropietario handler={(newPropietario) => handlerItemsPropietarios(newPropietario)} />}




                    </div>
                </div>
            </div>
        </>
    )
}
