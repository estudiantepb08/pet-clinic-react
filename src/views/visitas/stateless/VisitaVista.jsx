import React, { useEffect, useState } from "react";
import { FormVisita } from "../../../component/FormVisita";
import { ModalComponent } from "../../../component/modal";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import inputsVisit from "../../../common/data-inputs/inputsvisit.json";

export const VisitaVista = ({ data, addMethod,error,spinner }) => {
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState(() => inputsVisit);
  const [dataEdit, setDataEdit] = useState();
  const [show,setShow] = useState();
  const captureDataEdit = (data,action) => {
    setDataEdit(undefined);
    if(action === 'see'){data.action = 'see'} else {delete data?.action}
    setDataEdit(data);
    openModal('edit');
  }
  const openModal = (action) => {
    if (action === 'save') {
      setDataEdit(undefined);
    }
    setShowModal(true);
  }
  const closeModal = (show, action) => {


    setShowModal(show);
  };
  if (data?.length === 0 || spinner) {
    return (
      <Spinner animation="border" role="status" size="xl">
        <span className="visually-hidden">CARGANDO...</span>
      </Spinner>
    );
  }
  if(error){
    return(

    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
    <Alert.Heading>No se encontraron resultados!!</Alert.Heading>
    <p>
    Intenta con otro parámetro de búsqueda.
    </p>
  </Alert>
    )
}
  return (
    <div className="container shadow p-4">
      <div className="d-flex justify-content-between">
        <FormVisita />
        <button
          type="button"
          onClick={() => openModal('save')}
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Añadir una visita
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Propietario</th>
            <th scope="col">Tipo de mascota</th>
            <th scope="col">Mascota</th>
            <th scope="col">Fecha De Visita</th>
            <th scope="col">Veterinario Asignado</th>
            <th scope="col">Motivo Visita</th>
            <th scope="col">Primera vez</th>
            <th scope="col">Estado</th>
            <th scope="col">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((visit) => (
            <tr key={visit.idVisit}>
              <td>
                {visit.owner.primerNombre} {visit.owner.primerApellido}
              </td>
              <td>{visit.pet.tipoMascota}</td>
              <td>{visit.pet.nombreMascota}</td>
              <td>{visit?.dateVisit}</td>
              <td>
                {visit.veterinary.primerNombreVet}{" "}
                {visit.veterinary.primerApellidoVet}
              </td>
              <td>{visit.reason}</td>
              <td>{visit.isFirstVisit === true ? "SI" : "NO"}</td>
              <td>{visit.status === "ACTIVE" ? "ACTIVO" : "INACTIVO"}</td>
              <td className="d-flex gap-2 justify-content-between">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill icon_edit" viewBox="0 0 16 16"                  
                 onClick={() => captureDataEdit(visit,"see")}>
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-pencil-fill icon_edit"
                  onClick={() => captureDataEdit(visit)}
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalComponent
        show={showModal}
        close={closeModal}
        inputsModal={inputs}
        handleSave={addMethod}
        dataEdit={dataEdit}
      />
    </div>
  );
};
