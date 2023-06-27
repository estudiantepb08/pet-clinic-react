import React from 'react'
import { FormPropietario } from '../component/FormPropietario';
import { DetallePropietario } from '../component/DetallePropietario';
import { getDataPropietarioService, saveOwner, useUpdatePropietario, deleteOwner, updatePropietario } from '../services/dataPropietarioService';
import { getEstructuraPropietario, getEstructuraRequestApi } from '../data/data-propietario';
import { useEffect, useState } from 'react';
import { useFetch } from '../common/useFetch';

export const PropietarioVista = () => {

    /** Estados iniciales de la vista principal con la data basica */

    const [activarForm, setActivarForm] = useState(false);
    const [dataPropietario, setDataPropietario] = useState(getEstructuraPropietario);
    const [itemsPropietarios, setItemsPropietarios] = useState([]); 
    const [ownerEdit, setOwnerEdit] = useState();   
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

    const onActiveForm = (action) => {
        if(action === 'save'){setOwnerEdit(undefined)}
        setActivarForm(!activarForm);
    };
    
    /** Handler encargado de recibir la data del formulario y clonar la lista anterior y agregarle los nuevos registros */

    const handlerItemsPropietarios = async({id, primerNombre, segundoNombre, primerApellido, segundoApellido, telefono, direccion, correo },action) => {
        let responseOwner;
 
        if(action === 'save'){
            responseOwner = await saveOwner({
   
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
           });    
        }else{
            responseOwner = await updatePropietario({
                id:id,
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
            })
        }

       if(responseOwner.messages === 'Ok'){
        const data = await fetch(`${process.env.REACT_APP_MS_BUSCADOR_PROPIETARIO}/propietarios`)
        const resp = await data.json();
        if(resp.messages === 'Ok'){
            const dataItems = getDataPropietarioService(resp);
            setDataPropietario(dataItems);
            setItemsPropietarios(dataItems);
        }

       }
    };

    const handleEditOwner = async(owner) => {
            setOwnerEdit(owner);
    }

    const handlerDeleteOwnerItem = async(idOwner)=>{

        const mensaje = await deleteOwner(idOwner);       

        if(mensaje.messages == 'Ok'){
            setItemsPropietarios(itemsPropietarios.filter(item => item.id !== idOwner));
        }       
    };

    return (
        <>
            <div className='container'>
                <div className='card my-3'>
                    <div className='card-header'>
                        Datos Propietario
                    </div>
                    <div className='card-body'>
                        
                        <button className="btn btn-secondary" onClick={() => onActiveForm('save')}>{!activarForm ? 'Crear propietario' : 'Ocultar formulario'}</button>
                        {!activarForm ? '' : <FormPropietario handler={(newPropietario,action) => handlerItemsPropietarios(newPropietario,action)} ownerToEdit={ownerEdit} />}

                        <div className='row my-4'>
                            <div className='col'>
                                <DetallePropietario dataPropietarios={dataPropietario} handlerDeleteOwnerItem = { handlerDeleteOwnerItem } setPropietarios={setItemsPropietarios} ownerEdit={handleEditOwner} onActiveForm={onActiveForm} activarForm={activarForm}/>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
