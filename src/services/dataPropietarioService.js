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
}

/** Funcion que conusme el cliente rest para persistir en la base de datos */
export const savePropietario = async(itemsPropietarios) => {

    console.log(itemsPropietarios);

    const {primerNombre, segundoNombre, primerApellido, segundoApellido, } = itemsPropietarios;
    const {telefono, direccion, correoElectronico} = itemsPropietarios.contacto;

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
    }

    const peticion = {

        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosPropietarios),
    }
   
    return await savePropietarioApi(peticion);
}

//CLIENTE REST PARA CONSUMIR EL API DE GUARDAR PROPIETARIO

const savePropietarioApi = async(peticion) => {

    const url = 'http://localhost:8762/ms-buscador/v1/pet-clinic/propietarios';

    const response = await fetch(url, peticion);
    const dataserv = await response.json();

    const mensaje = {
        messages: dataserv.messages,
        id: dataserv.data.id
    };

    return mensaje;
}
