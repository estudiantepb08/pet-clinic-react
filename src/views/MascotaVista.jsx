import React, { useEffect, useState } from 'react';
import { FormMascota } from '../component/FormMascota';
import { DetalleMascota } from '../component/DetalleMascota';
import { dataMascotasService, getTipoMascota } from '../services/dataMascotaService';
import {estructuraList } from '../data/data-mascota';

export const MascotaVista = () => {

  const[dataMascotas, setDataMascotas] = useState(estructuraList);
  const[activarForm, setActivarForm] = useState(false);
  const[itemsMascotas, setItemsMascotas] = useState([]);
  const[tipoMascotas, setTipoMascotas] = useState([])

  const onActiveForm = ()=>{
    setActivarForm(!activarForm);
  };

  useEffect(()=>{
    const mascotas = dataMascotasService();
    console.log(mascotas);
    const mascotaTipos = getTipoMascota();     
    setDataMascotas(mascotas);
    setItemsMascotas(mascotas);
    setTipoMascotas(mascotaTipos);
  },[]);

  useEffect(()=>{
    setDataMascotas(itemsMascotas);
  },[itemsMascotas]);

  const handlerItemsMascota = ({nombreMascota, fechaNacimiento, tipoMascota}) => {
    setItemsMascotas([...itemsMascotas,{
      id: itemsMascotas.length + 1, 
      nombreMascota: nombreMascota, 
      fechaNacimiento: fechaNacimiento,
      tipoMascota: tipoMascota
    }]);
  };
  
/**  */
  return (
    <>
      <div className='container'>
        <div className='card my-3'>
          <div className='card-header'>
            Datos Mascota
          </div>
          <div className='card-body'>
            <div className='row my-4'>
              <div className='col'>
              <DetalleMascota mascotaData = { dataMascotas } />
              </div>
              <div className='col'>
                <button className="btn btn-secondary" onClick={onActiveForm}>{!activarForm ? 'Crear mascota' : 'Ocultar formulario'}</button>
                {!activarForm ? '' : <FormMascota handler={(newMascota) => handlerItemsMascota(newMascota)} dataTipoMascota={tipoMascotas} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
