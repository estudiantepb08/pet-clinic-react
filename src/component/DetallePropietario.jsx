
import React, { useState } from 'react';
import { RowDetallePropietario } from './RowDetallePropietario';

export const DetallePropietario = ({ dataPropietarios }) => {

    const [busqueda, setBusqueda] = useState("");

    const onChangeInput = event => {
        setBusqueda(event.target.value);
    };

    const propietarios = !busqueda ? dataPropietarios : dataPropietarios.filter(propietario => propietario.primerNombre.toLowerCase().includes(busqueda.toLowerCase()));

    const title = 'Tabla Propietario';
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
                                <th>Telefono</th>
                                <th>Direccion</th>
                                <th>Correo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {propietarios?.map(({ id, primerNombre, segundoNombre, primerApellido, segundoApellido, telefono, direccion, correo }) => (<RowDetallePropietario
                                key={id}
                                id={id}
                                primerNombre={primerNombre}
                                segundoNombre={segundoNombre}
                                primerApellido={primerApellido}
                                segundoApellido={segundoApellido}
                                telefono={telefono}
                                direccion={direccion}
                                correo={correo}

                            />))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}
