import { getDataMascota, tipoMascota } from '../data/data-mascota';

export const dataMascotasService = ()=>{

    const mascotas = getDataMascota.map(mascotas => mascotas);    
    return mascotas;
};

export const getTipoMascota = ()=>{
    const mascotaTipo = tipoMascota.map(tipo => tipo);
    return mascotaTipo;
}