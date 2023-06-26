import React, { useState } from 'react';
import { RowDetalleVeterinario } from './RowDetalleVeterinario';

export const DetalleVeterinario = ({ veterinarioData }) => {

    const [busqueda, setBusqueda] = useState("");

    const onChangeInput = event => {
        setBusqueda(event.target.value);
    };

    const veterinarios = !busqueda ? veterinarioData : veterinarioData.filter(veterinario => veterinario.primerNombre.toLowerCase().includes(busqueda.toLowerCase()));

    const title = 'Tabla Veterinario';
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
                            {veterinarios.map(({ id, primerNombre, segundoNombre, primerApellido, segundoApellido, especialidad }) => (<RowDetalleVeterinario
                                key={id}
                                id={id}
                                primerNombre={primerNombre}
                                segundoNombre={segundoNombre}
                                primerApellido={primerApellido}
                                segundoApellido={segundoApellido}
                                especialidad={especialidad}                              

                            />))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}
