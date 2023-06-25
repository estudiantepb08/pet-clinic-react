import React, { useEffect } from 'react'
import { useState } from 'react'
import { VisitaVista } from '../stateless/VisitaVista';
import { useFetch } from '../../../common/useFetch';
import { FilterVisit } from '../stateless/filterVisit';
import { Alert } from 'react-bootstrap';
export const VisitData = () => {
    const {data, error, ok} = useFetch(process.env.REACT_APP_MS_OPERADOR);
    const [spinner,setSpinner] = useState();
     const {data:typePets} = useFetch(`${process.env.REACT_APP_MS_BUSCADOR}/tipoMascotas`);
    const [filter,setFilter] = useState();
    const [errors,setErrors] = useState();
    const [visits,setVisits] = useState([]);
    const addVisit = (visitsArray) => {
        setVisits(visitsArray);
    }

    const handleSearchFilter = async(paramMSBuscador, paramMsOperador) => {
        setSpinner(true);
        let dataServices;
        if((!paramMSBuscador && !paramMsOperador) || (paramMSBuscador === "" && paramMsOperador === "")){
            dataServices = {};
        }else {
            dataServices = {
               paramMSBuscador,
               status:paramMsOperador === 'ACTIVO' ? 'ACTIVE' : 'INACTIVE'
           }
        }
        if(paramMSBuscador === ""){delete dataServices.paramMSBuscador};
        if(paramMsOperador === ""){delete dataServices.paramMsOperador};
        setFilter(dataServices);
        const options = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataServices) 
        };
            const resp = await fetch(`${process.env.REACT_APP_MS_OPERADOR}/search`,options);
            const dataFilter = await resp.json();
            if(!dataFilter?.listData){
                setErrors({error:"No se encontraron resultados"});
                setSpinner(false);

            }else {
                setErrors(undefined);
                setVisits(dataFilter?.listData);
                setSpinner(false);

            }
            
        
    }


    // useEffect(() => {
    //     handleSearchFilter();
    // },[filter])

    useEffect(() => {
      if (data) {
        setVisits(data.listData);
      }
    }, [data]);
    return (
        <>
            <FilterVisit typePets={typePets} handleFilter={handleSearchFilter}/>
            <VisitaVista data={visits} addMethod={addVisit} error={errors} spinner={spinner}/>
                
          
        </>
    )
}