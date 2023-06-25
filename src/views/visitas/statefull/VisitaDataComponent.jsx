import React, { useEffect } from 'react'
import { useState } from 'react'
import { VisitaVista } from '../stateless/VisitaVista';
import { useFetch } from '../../../common/useFetch';
export const VisitData = () => {
    const [visit, setVisit] = useState();
    const {data, error, ok} = useFetch(process.env.REACT_APP_MS_OPERADOR);

    return (
        <>
            <VisitaVista data={data?.listData}/>
                
          
        </>
    )
}