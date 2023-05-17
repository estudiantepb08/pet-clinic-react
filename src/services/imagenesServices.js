
import { imagenesMascotas } from "../data/imagenes-mascotas";

export const getImagenesMascotas = () =>{    
    const mascotas = imagenesMascotas.map(img => img);    
    return mascotas;
}