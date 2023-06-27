import { Form } from "react-bootstrap"
import { useForm } from "../../../common/useForm";
import { useEffect } from "react";

export const FilterVeterinary = ({ handleFilter }) => {
    const { formValues, onInputChange } = useForm({});
    useEffect(() => {
        console.log(formValues);
        handleFilter(formValues?.search)
    },[formValues])
    return (
        <>
            <Form.Group >
                <Form.Label>Buscar</Form.Label>
                <Form.Control
                    type="text"
                    name="search"
                   
                    onChange={onInputChange}
                />
            </Form.Group>
        </>
    )
}