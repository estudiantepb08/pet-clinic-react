import { getDataVeterinario } from '../data/data-veterinario';

export const getDataVeterinarioService = ()=>{

    const veterinario = getDataVeterinario.map(veterinario => veterinario);    
    return veterinario;
}