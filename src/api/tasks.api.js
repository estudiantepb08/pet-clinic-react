import axios from 'axios'

export const enviodatosvet = async (data) =>  {

    await axios.post('http://localhost:8082/v1/pet-clinic-veterinarios',data);
}

    export const actualizaciondata = async (id,data) => {
        console.log("ESTA LLEGANDO LOS DATSO DE CAMILOEL SENIOR")
        await axios.put(`http://localhost:8082/v1/pet-clinic-veterinarios/${id}`,data);

    }

export const deleteItem = async (id) => {
    await axios.delete(`http://localhost:8082/v1/pet-clinic-veterinarios/${id}`);
}
