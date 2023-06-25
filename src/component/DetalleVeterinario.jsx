import React, { useState } from 'react';
import { RowDetalleVeterinario } from './RowDetalleVeterinario';

export const DetalleVeterinario = ({ veterinarioData }) => {
    console.log(veterinarioData);
    const [busqueda, setBusqueda] = useState("");

    const onChangeInput = event => {
        setBusqueda(event.target.value);
    };

    const veterinarios = !busqueda ? veterinarioData : veterinarioData?.filter(veterinario => veterinario.primerNombre.toLowerCase().includes(busqueda.toLowerCase()));

    const title = 'Tabla Veterinario';
    var n=0;
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
                                <th>Primer Nombre</th>
                                <th>Segundo Nombre</th>
                                <th>Primer APellido</th>
                                <th>Segundo Apellido</th>
                                <th>Especialidad</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {veterinarios?.map(({primerNombreVet, segundoNombreVet, primerApellidoVet, segundoApellidoVet, especialidad,id }) => (<RowDetalleVeterinario
                                id={n=n+1}
                                primerNombre={primerNombreVet}
                                segundoNombre={segundoNombreVet}
                                primerAPellido={primerApellidoVet}
                                segundoApellido={segundoApellidoVet}
                                especialidad={especialidad.tipoEspecialidad}                              
                                key={id}
                            />))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}
