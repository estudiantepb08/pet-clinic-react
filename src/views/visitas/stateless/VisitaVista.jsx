import React, { useState } from 'react'
import { FormVisita } from '../../../component/FormVisita';
import { ModalComponent } from '../../../component/modal';
import { Button, Modal } from 'react-bootstrap';
import inputsVisit from '../../../common/data-inputs/inputsvisit.json'

export const VisitaVista = ({data}) => {
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState(() => inputsVisit);

  const closeModal = (show) => {
    setShowModal(show);
  }
  return (
    <div className='container shadow p-4'>
      <div className='d-flex justify-content-between'>
      <FormVisita />
      <button type="button" onClick={() => setShowModal(true)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Añadir una visita</button>
      </div>
      <table className='table'>
          <thead>
              <tr>
                  <th scope='col'>Propietario</th>
                  <th scope='col'>Tipo de mascota</th>
                  <th scope='col'>Mascota</th>
                  <th scope='col'>Fecha De Visita</th>
                  <th scope='col'>Veterinario Asignado</th>
                  <th scope='col'>Motivo Visita</th>
                  <th scope='col'>Primera vez</th>
                  <th scope='col'>Estado</th>
              </tr>
          </thead>
          <tbody>
                {
                  data?.map((visit) => (
            <tr key={visit.idVisit}>
                      <td>{visit.owner.primerNombre} {visit.owner.primerApellido}</td>
                      <td>{visit.pet.tipoMascota}</td>
                      <td>{visit.pet.nombreMascota}</td>
                      <td>{visit.dateVisit}</td>
                      <td>{visit.veterinary.primerNombreVet} {visit.veterinary.primerApellidoVet}</td>
                      <td>{visit.reason}</td>
                      <td>{visit.isFirstVisit === true ? 'SI' : 'NO'}</td>
                      <td>{visit.status ==='ACTIVE' ? 'ACTIVO' : 'INACTIVO'}</td>


            </tr>
                  ))
                }
          </tbody>
      </table>
      <ModalComponent show={showModal} close={closeModal} inputsModal={inputs} />
    </div>
  )
}
