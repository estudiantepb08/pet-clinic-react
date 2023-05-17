import { getDataPropietario } from '../data/data-propietario';

export const getDataPropietarioService = ()=>{

    const propietarios = getDataPropietario.map(propietario => propietario);    
    return propietarios;
}