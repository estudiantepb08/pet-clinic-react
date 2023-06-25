import { useState } from "react";

export const useForm = (initialForm) => {
    const [ formValues, setFormState ] = useState( initialForm );
    const onInputChange = ({target}) => {
        const { name, value } = target;
        console.log({name,value});
        setFormState({
            ...formValues,
            [ name ]: value
        });
    }
    const onResetForm = () => {
        setFormState( initialForm );
    }
    return {
        ...formValues,
        formValues,
        onInputChange,
        onResetForm,
    }
}