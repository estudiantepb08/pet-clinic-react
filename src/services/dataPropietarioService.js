//import { getDataPropietario } from '../data/data-propietario';

export const getDataPropietarioService = (datasevices) => {

    // console.log(datasevices?.data);
    const itemsPropietario = datasevices?.data?.map(item => ({

        id: item.id,
        primerNombre: item.primerNombre,
        segundoNombre: item.segundoNombre,
        primerApellido: item.primerApellido,
        segundoApellido: item.segundoApellido,
        telefono: item.contactoId[0].telefono,
        direccion: item.contactoId[0].direccion,
        correo: item.contactoId[0].correoElectronico

    }));

    //console.log(itemsPropietario);

    return itemsPropietario;

    /*const propietarios = getDataPropietario.map(propietario => propietario);    
    return propietarios;*/
};

/** Funcion que conusme el cliente rest para persistir en la base de datos
 *  CLIENTE REST PARA CONSUMIR EL API DE GUARDAR PROPIETARIO
 */
export const saveOwner = async(itemsPropietarios) => {

   // console.log(itemsPropietarios);
    const { primerNombre, segundoNombre, primerApellido, segundoApellido, } = itemsPropietarios;
    const { telefono, direccion, correoElectronico } = itemsPropietarios.contacto;    

    const datosPropietarios = {

        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        contacto:
        {
            telefono,
            direccion,
            correoElectronico
        }
    };

    const peticion = {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosPropietarios),
    };

    /** Funcion asyncrona para consumir el api rest de guardar */
       
        const url = 'http://localhost:8762/ms-buscador/v1/pet-clinic/propietarios';
        const response = await fetch(url, peticion);
        const dataserv = await response.json();

    return  {
        messages: dataserv.messages,
        id: dataserv.data.id
    };
};

export const updatePropietario = async(formPropietario) => {

    const url = `http://localhost:8762/ms-buscador/v1/pet-clinic/propietarios/${peticion.body.datosPropietarios.id}`;    

    const { id, primerNombre, segundoNombre, primerApellido, segundoApellido, } = formPropietario;
    const { telefono, direccion, correoElectronico } = formPropietario.contacto;

    const ownerDataUpdate = {

        id,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        contacto:
        {
            telefono,
            direccion,
            correoElectronico
        }
    };

    const peticion = {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ownerDataUpdate),
    };  
    
    const updateResponse = await fetch(url, peticion);
    const data = await updateResponse.json();
     
    return data.messages
};

//CLIENTE REST PARA CONSUMIR EL API DE ELIMINAR PROPIETARIO
export const deleteOwner = async(idOwner) => {

    const peticion = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    };

        const url = `http://localhost:8762/ms-buscador/v1/pet-clinic/propietarios/${idOwner}`;
        const deleteResponse = await fetch(url, peticion);
        const data = await deleteResponse.json();    
    
    return data;
}