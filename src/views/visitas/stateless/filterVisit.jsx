import { Form } from "react-bootstrap";
import status from '../../../common/dataMock/status.json';
import { useForm } from "../../../common/useForm";
import { useEffect } from "react";
export const FilterVisit = ({typePets, handleFilter}) => {

    const {formValues,onInputChange} = useForm({});
  
    useEffect(() => {
        console.log(formValues);
        handleFilter(formValues?.typePet, formValues?.status)
    },[formValues])
    return (
        <>
              <div className="d-flex justify-content-between gap-2">
              <Form.Label>Tipo Mascota</Form.Label>
               <Form.Control  as="select" size="sm" name="typePet" onChange={onInputChange}>
               <option value=""></option>
                    {
                        
                        typePets?.data?.map((typePet) => (
                            <option value={typePet.tipoMascota}  key={typePet.id} >
                            {typePet.tipoMascota}
                        </option>
                        ))
                    }
               </Form.Control>
               <Form.Label>Estado</Form.Label>
               <Form.Control  as="select" name="status"  onChange={onInputChange}>
               <option value=""></option>
                    {
                        status.map((status) => (
                            <option value={status}  key={status}>
                            {status}
                        </option>
                        ))
                    }
               </Form.Control>
            </div>
        </>
    )
}