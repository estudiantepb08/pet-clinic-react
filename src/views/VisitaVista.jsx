import React from 'react'
import { FormVisita } from '../component/FormVisita';
export const VisitaVista = () => {
  return (
    <div className='container'>
      <FormVisita />
      <h1 className='badge bg-primary text-wrap'>Visita En Construción</h1>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
        </ul>
      </div>
    </div>
  )
}
