import React, { useEffect, useState } from 'react';
import { RowDetalleMascota } from './RowDetalleMascota';
import { debounce } from 'lodash';
import { Form } from 'react-bootstrap';

export const DetalleMascota = ({ mascotaData, handlerDeletePetItem,tipoMascotas,setMascotas }) => {
    let mascotas = mascotaData;
    const [busqueda, setBusqueda] = useState("");
    const [busquedaSelect, setBusquedaSelect] = useState();

    const handleTypePet = ({target}) => {
        console.log(target.value);
        setBusquedaSelect(target.value);
        setBusqueda("");
        search(target.value);
    }
    const onChangeInput = event => {
        setBusqueda(event.target.value);
        console.log(event.target.value);
        setBusquedaSelect("");
        filter(event.target.value);
    };
    const filter = (value) => {
        search(value)
    }

    const search = debounce(async (value) => {
        try {
            if((!value || value === "")){
                mascotas = mascotaData;
            }else{
                
                const data = await fetch(`${process.env.REACT_APP_MS_BUSCADOR}/mascotas/buscar-todo?buscar=${value}`)
                const resp = await data.json();
                if(resp.messages === 'Ok'){
                    const petsSendState = resp.data.map((pet) => {
                        const {contactoId, ...petEdit} = pet 
                        const {id,propietariosId,...propietario} = pet.propietario;
                        const {id:petId,codigoTipo,descripcionTipo,...tipoMascota} = pet.tipoMascota;
                        const object = {
                            id: petEdit.id, 
                            nombreMascota: petEdit.nombreMascota, 
                            fechaNacimiento: petEdit.fechaNacimiento,
                            propietario: propietario.primerNombre + propietario.primerApellido,
                            tipoMascota: tipoMascota.tipoMascota  
                        }
                        return object;
                    })
                    setMascotas(petsSendState);
                }else{mascotas = mascotaData}
            }
        } catch (error) {
            console.error('Error de búsqueda:', error);

        }
     
    },1000);
    //  mascotas = !busqueda ? mascotaData : mascotaData.filter(mascota => mascota.nombreMascota.toLowerCase().includes(busqueda.toLowerCase()));

    const title = 'Tabla Mascota';
    return (
        <>
            <div className='container'>
                <div className='my-4'>
                    <h4>{title}</h4>

                    <div className="d-flex" role="search">
                        <input className="form-control me-2"
                            type="search" name='busqueda'
                            placeholder="buscar nombre"
                            aria-label="Search"
                            value={busqueda}
                            onChange={onChangeInput} />
                    </div>
                    <div>
                    <Form.Label>Tipo Mascota</Form.Label>
               <Form.Control  as="select" size="sm" name="typePet" value={busquedaSelect} onChange={handleTypePet}>
               <option value=""></option>
                    {
                        
                        tipoMascotas?.map((typePet) => (
                            <option value={typePet.tipoMascota}  key={typePet.id} >
                            {typePet.tipoMascota}
                        </option>
                        ))
                    }
               </Form.Control>
                    </div>

                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Nombre Mascota</th>
                                <th>Fecha Nacimiento</th>
                                <th>Propietarios</th>
                                <th>Tipo Mascota</th>
                                <th>Operacion</th>                                                            
                            </tr>
                        </thead>
                        <tbody>
                        { mascotas?.map(({ id, nombreMascota, fechaNacimiento, propietario, tipoMascota }) => (<RowDetalleMascota
                                key={id}
                                id={id}
                                nombreMascota={nombreMascota}
                                fechaNacimiento={fechaNacimiento}
                                propietario={propietario}
                                tipoMascota={tipoMascota}
                                handlerDeletePetItem={id => handlerDeletePetItem(id)}
                            />))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}