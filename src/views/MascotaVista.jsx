import React, { useEffect, useState } from 'react';
import { FormMascota } from '../component/FormMascota';
import { DetalleMascota } from '../component/DetalleMascota';
import { useMascotas, useTipoMascota, useOwners, deletePet, savePet } from '../services/dataMascotaService';
import {estructuraList } from '../data/data-mascota';

export const MascotaVista = () => {

  const[dataMascotas, setDataMascotas] = useState(estructuraList);
  const[activarForm, setActivarForm] = useState(false);
  const[itemsMascotas, setItemsMascotas] = useState([]);
  const[tipoMascotas, setTipoMascotas] = useState([]);
  const[propietarios, setPropietarios] = useState([]);

  const {mascotas} = useMascotas("http://localhost:8762/ms-buscador/v1/pet-clinic-mascota/mascotas");
  const {typePet} = useTipoMascota('http://localhost:8762/ms-buscador/v1/pet-clinic-mascota/tipoMascotas');
  const {owner} = useOwners('http://localhost:8762/ms-buscador/v1/pet-clinic/propietarios');

  const onActiveForm = ()=>{
    setActivarForm(!activarForm);
  };
 
  console.log(mascotas);
  console.log(typePet);

  useEffect(()=>{       
 
    setDataMascotas(mascotas);
    setItemsMascotas(mascotas);
    setTipoMascotas(typePet);
    setPropietarios(owner);
  },[mascotas, typePet, owner]);

  useEffect(()=>{
    setDataMascotas(itemsMascotas);
  },[itemsMascotas]);

  const handlerItemsMascota = async({nombreMascota, fechaNacimiento, propietario, tipoMascota}) => {

    const requestPet = await savePet({ 
      nombreMascota: nombreMascota, 
      fechaNacimiento: fechaNacimiento,
      propietario: propietario,
      tipoMascota: tipoMascota
    });

      if(requestPet.messages == 'Ok'){

    setItemsMascotas([...itemsMascotas,{
      id: requestPet.id, 
      nombreMascota: nombreMascota, 
      fechaNacimiento: fechaNacimiento,
      propietario: propietario,
      tipoMascota: tipoMascota      
    }]);
  }
  };
  
  const handlerDeletePetItem = async(idPet)=>{

     const mensaje = await deletePet(idPet);       
 
    console.log(mensaje.messages);

    if(mensaje.messages == 'Ok'){
      setItemsMascotas(itemsMascotas.filter(item => item.id !== idPet));
    }       
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
          
          <button className="btn btn-secondary" onClick={onActiveForm}>{!activarForm ? 'Crear mascota' : 'Ocultar formulario'}</button>
                {!activarForm ? '' : <FormMascota handler={(newMascota) => handlerItemsMascota(newMascota)} dataTipoMascota={tipoMascotas} listPropietarios={propietarios} />}
                
            <div className='row my-4'>
              <div className='col'>
              <DetalleMascota mascotaData = { dataMascotas } handlerDeletePetItem={handlerDeletePetItem} />
              </div>              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
