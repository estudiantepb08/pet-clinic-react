import { useEffect, useState } from 'react';
//import { getDataMascota, tipoMascota } from '../data/data-mascota';


export const useMascotas = (url) => {

    const [mascotas, setMascotas] = useState([]);

    const peticion = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const getMascotas = async () => {
        const responseTipoMascota = await fetch(url, peticion);
        const { data } = await responseTipoMascota.json();
        setMascotas(data?.map(item =>({

            id: item.id,
            nombreMascota: item.nombreMascota,
            fechaNacimiento: item.fechaNacimiento,
            propietario: item.propietario.primerNombre+' '+item.propietario.primerApellido,
            tipoMascota: item.tipoMascota.tipoMascota 
        })));
    }

    console.log(mascotas);

    useEffect(() => {
        getMascotas();
    }, [url])

    return  {
        mascotas
    }

    /* const mascotas = getDataMascota.map(mascotas => mascotas);    
    return mascotas;*/
};

export const useTipoMascota = (url) => {

    const [typePet, setTypePet] = useState([]);
    
    const peticion = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const getTypePet = async()=>{

    const responseTipoMascota = await fetch(url, peticion);

    const { data } = await responseTipoMascota.json();
    
    setTypePet(data?.map(item =>({
        id: item.id,
        tipoMascota: item.tipoMascota
    })))
    }

    console.log(typePet);

    useEffect(()=>{
        getTypePet();
    },[])

    return {
        typePet
    }
    /*const mascotaTipo = tipoMascota.map(tipo => tipo);
    return mascotaTipo;*/
}

export const useOwners = (url) => {

    const [owner, setOwner] = useState([]);
    
    const peticion = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const getOwner = async()=>{

    const responseOwner = await fetch(url, peticion);

    const { data } = await responseOwner.json();
    
    setOwner(data?.map(item =>({
        id: item.id,
        propietario: item.primerNombre +' '+ item.primerApellido
    })))
    }

    console.log(owner);

    useEffect(()=>{
        getOwner();
    },[])

    return {
        owner
    }
    /*const mascotaTipo = tipoMascota.map(tipo => tipo);
    return mascotaTipo;*/
}

export const savePet = async(dataPet) =>{

    const{nombreMascota, fechaNacimiento, propietario, tipoMascota} = dataPet;

    const requestBodyPet = 
    {
        nombreMascota,
        fechaNacimiento,
        tipoMascota:{
            id: tipoMascota
            },
        propietario:{
            id: propietario
        }
    }

    const peticion = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBodyPet)
    }
    
        const url = 'http://localhost:8762/ms-buscador/v1/pet-clinic-mascota/mascotas';
        const responseService = await fetch(url, peticion);
        const data  = await responseService.json();
    return {
        id: data.id,
        messages: data.messages
    }
}

export const deletePet = async (idPet) => {

    const peticion = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const url = `http://localhost:8762/ms-buscador/v1/pet-clinic-mascota/mascotas/${idPet}`;
    const deleteResponse = await fetch(url, peticion);
    const data = await deleteResponse.json();

    return data;
}


/*
{
    "id": "1TPp4YgBAf3rg8QEjGbE",
    "mascotasId": null,
    "nombreMascota": "Mariana",
    "fechaNacimiento": "2023-02-01T00:00:00.000+00:00",
    "propietario": {
        "id": "uzOE4YgBAf3rg8QENmag",
        "propietariosId": 1,
        "primerNombre": "Albeiro",
        "segundoNombre": "Camilo",
        "primerApellido": "Pica",
        "segundoApellido": "Piedra",
        "contactoId": [
            {
                "conctatosId": "ujN-4YgBAf3rg8QEU2ZF",
                "telefono": "6017777777",
                "direccion": "Calle: 16 # 25-41",
                "correoElectronico": "picapiedra@gmail.com"
            }
        ]
    },
    "tipoMascota": {
        "id": "wzPF4YgBAf3rg8QE7Gao",
        "codigoTipo": 2,
        "tipoMascota": "Gato",
        "descripcionTipo": "Mascota de tipo felino"
    }
}*/