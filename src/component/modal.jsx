import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFetch } from '../common/useFetch';
import { useForm } from '../common/useForm';

export const ModalComponent = ({ show, close, inputsModal }) => {
    const { data, error, ok } = useFetch(`${process.env.REACT_APP_MS_BUSCADOR}/mascotas`);
    const {save,setSave} = useState();
    const { data:dataOwner, error:errorOwner, ok:okOwner  } = useFetch(`${process.env.REACT_APP_MS_BUSCADOR_PROPIETARIO}/propietarios`);
    const { data:dataVeterinary, error:errorVeterinary, ok:okVeterinary  } = useFetch(`${process.env.REACT_APP_MS_VETERINARIO}`);

    const {formValues,onInputChange} = useForm({
    });
    const [pets, setPets] = useState();
    const [owners, setOwners] = useState();
    const [veterinaries, setVeterinaries] = useState();

    useEffect(() => {
        setPets(data?.data);
        setOwners(dataOwner?.data);
        setVeterinaries(dataVeterinary?.data);
        console.log(dataVeterinary);
    }, [data, dataOwner,dataVeterinary]);

    const handleSubmit = async() => {
        const date = new Date( formValues.dateVisit);
        const isoDate = date.toISOString();

        const dataServices = {
            dateVisit:isoDate,
            pet:{
                mascotasId:formValues.pet
            },
            owner:{propietariosId:formValues.owner},
            veterinary:{veterinarioId:formValues.veterinary},
            reason:formValues.reason,
            cost:formValues.price,
            isFirstVisit:formValues.isFirstVisit === 'SI' ? true : false,
            status:formValues.status === 'ACTIVO' ? 'ACTIVE' : 'INACTIVE'
        }
        const options = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataServices) 
        };
        const resp = await fetch(process.env.REACT_APP_MS_OPERADOR,options);
        const dataResp = await resp.json();
        close(false);
        console.log(dataResp);
    }
    return (
        <>
            <Modal show={show} >
                <Modal.Header closeButton onClick={() => close(false)}>
                    <Modal.Title>AÑADIR VISITA</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        {
                            inputsModal.map((input) => (
                                <div key={input.id}>
                                    {input.type === 'date' ? (
                                              <Form.Group controlId={input.name}>
                                              <Form.Label>{input.label}</Form.Label>
                                              <Form.Control
                                                type="date"
                                                name={input.name}
                                                value={formValues[input.name] || ''}
                                                onChange={onInputChange}
                                              />
                                            </Form.Group>
                                    ): null}
                                    {input.type === 'input' ?(
                                          <Form.Group controlId="exampleForm.ControlInput1">
                                          <Form.Label>{input.label}</Form.Label>
                                          <Form.Control type={input.typeInput} name={input.name} onChange={onInputChange}  value={formValues[input.name] || ''} placeholder={input.placeholder} />
                                        </Form.Group>
                                    ) : null}
                                    {input.type === 'select' ? (
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Label>{input.label}</Form.Label>
                                            <Form.Control as="select" onChange={onInputChange}  name={input.name}>
                                            <option value="">{input.placeholder}</option>
                                                {input.label === 'Mascota' &&
                                                    pets?.map((pet) => (
                                                        <option value={pet.mascotasId}  key={pet.mascotasId}>
                                                            {pet.nombreMascota}
                                                        </option>
                                                    ))}
                                                 {input.label === 'Propietario' &&
                                                    owners?.map((owner) => (
                                                        <option value={owner.propietariosId} key={owner.propietariosId}>
                                                            {owner.primerNombre} {owner.segundoNombre} {owner.primerApellido} {owner.segundoApellido}
                                                        </option>
                                                    ))}
                                                         {input.label === 'Veterinario' &&
                                                    veterinaries?.map((veterinary) => (
                                                        <option value={veterinary.veterinarioId} key={veterinary.veterinarioId}>
                                                            {veterinary.primerNombreVet} {veterinary.segundoNombreVet} {veterinary.primerApellidoVet} {veterinary.segundoApellidoVet}
                                                        </option>
                                                    ))}
                                                {input.label === 'Estado' && 
                                                    input?.data?.map((data) => (
                                                        <option value={data} key={data}>
                                                        {data}
                                                    </option>
                                                    ))}
                                                        {input.label === 'Primera vez' && 
                                                    input?.data?.map((data) => (
                                                        <option value={data} key={data}>
                                                        {data}
                                                    </option>
                                                    ))}
                                            </Form.Control>
                                        </Form.Group>
                                    ) : null}
                                </div>
                            ))
                        }
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => close(false)}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}