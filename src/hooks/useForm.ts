import {ChangeEvent, useState} from "react";
import {Form} from "../utils/types";

const useForm = (inputValues: Form) => {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };

    return {values, handleChange, setValues};
};

export default useForm;