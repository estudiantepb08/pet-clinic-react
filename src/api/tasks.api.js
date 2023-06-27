import axios from 'axios'

export const enviodatosvet = async (data) =>  {

    await axios.post(process.env.REACT_APP_MS_VETERINARIO2,data);
}

    export const actualizaciondata = async (id,data) => {
      const {data:dataResponse} =  await axios.put(`${process.env.REACT_APP_MS_VETERINARIO2}/${id}`,data);
       
      console.log(dataResponse,"Resp axio");  
      return dataResponse
    }

export const deleteItem = async (id) => {
    await axios.delete(`${process.env.REACT_APP_MS_VETERINARIO2}/${id}`);
}
