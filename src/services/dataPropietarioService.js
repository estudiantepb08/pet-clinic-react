import { getDataPropietario } from '../data/data-propietario';

export const getDataPropietarioService = ()=>{

    const propietariosApi = async() =>{

        const url = "http://localhost:8762/ms-buscador/v1/pet-clinic/propietarios"
        const response = await fetch(url);
        const {data} = await response.json();

        
        
        const itemsPropietario = data.map(item =>({

            //item.id,

            id: item.propietariosId,
            primerNombre: item.primerNombre,
            segundoNombre: item.segundoNombre,
            primerAPellido: item.primerApellido,
            segundoApellido: item.segundoApellido,
            telefono: item.contactoId.telefono,
            direccion: item.contactoId.direccion,
            correo: item.contactoId.correoElectronico            
        }));  

        console.log(itemsPropietario);

        return itemsPropietario; 
        

    }

    return propietariosApi();

    /*const propietarios = getDataPropietario.map(propietario => propietario);    
    return propietarios;*/
}