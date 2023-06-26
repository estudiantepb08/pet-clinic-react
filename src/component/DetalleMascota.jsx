import React, { useState } from 'react';
import { RowDetalleMascota } from './RowDetalleMascota';

export const DetalleMascota = ({ mascotaData, handlerDeletePetItem }) => {

    const [busqueda, setBusqueda] = useState("");

    const onChangeInput = event => {
        setBusqueda(event.target.value);
    };

    const mascotas = !busqueda ? mascotaData : mascotaData.filter(mascota => mascota.nombreMascota.toLowerCase().includes(busqueda.toLowerCase()));

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
                        { mascotas.map(({ id, nombreMascota, fechaNacimiento, propietario, tipoMascota }) => (<RowDetalleMascota
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