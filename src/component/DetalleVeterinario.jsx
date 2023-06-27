    import React, { useState } from 'react';
    import { deleteItem } from '../api/tasks.api';
    
export const DetalleVeterinario = ({ veterinarioData,activeForm,stateForm,addValuesFormState,setItemsVeterinarios }) => {
    console.log(veterinarioData);
    const [busqueda, setBusqueda] = useState('');
    const [activarForm, setActivarForm] = useState(false);
    
    const onActiveForm = (newStateForm) => {
        activeForm(newStateForm);
    };
    const onChangeInput = event => {
        setBusqueda(event.target.value);
    };

    const veterinarios = !busqueda
        ? veterinarioData
        : veterinarioData?.filter(veterinario =>
            veterinario.primerNombreVet.toLowerCase().includes(busqueda.toLowerCase())
        );



    const title = 'Tabla Veterinario';

    const actiondelete = async id => {
        try {
        await deleteItem(id);
        const resp = await fetch(process.env.REACT_APP_MS_VETERINARIO2)
        const data = await resp.json();
        if(data.messages === 'Ok'){
            setItemsVeterinarios(data.data);
        }
        console.log('Deleting item.....');
        } catch (error) {
        console.log(error);
        }
    };

    const modificar = async (values) =>{
        onActiveForm(!stateForm);
        addValuesFormState(values);

        try{
        }catch (error) {
            console.log(error);
    }
    }
    var n = 0;
    return (
        <>
        <div className="">
            <div className="my-4">
            <h4>{title}</h4>

            <div className="d-flex" role="search">
                <input
                className="form-control me-2"
                type="search"
                name="busqueda"
                placeholder="buscar nombre"
                aria-label="Search"
                value={busqueda}
                onChange={onChangeInput}
                />
            </div>

            <table className="table table-striped table-hover text-center align-content-between">
                <thead>
                <tr className="">
                    <th>#</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Especialidad</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {veterinarios?.map(
                    ({ primerNombreVet, segundoNombreVet, primerApellidoVet, segundoApellidoVet, especialidad, id }) => (
                    <tr key={id}>
                        <th>{(n = n + 1)}</th>
                        <td>{primerNombreVet} {segundoNombreVet}</td>
                        <td>{primerApellidoVet} {segundoApellidoVet}</td>
                        <td>{especialidad.tipoEspecialidad}</td>
                        <td >
                        <button className="btn btn-danger" value={id} onClick={() => actiondelete(id)}>Del</button>
                        <button className="btn btn-info " value={id} onClick={() => modificar({primerNombreVet, segundoNombreVet, primerApellidoVet, segundoApellidoVet, especialidad, id} )}  >Md</button>
                        
                        </td>
                    </tr>
                    )
                )}
                </tbody>
            </table>
            </div>
        </div>
        </>
    );
    };
