import React, {useRef, useState} from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";


const EditInput = ({
        value,
        onChange,
        name,
        type,
        error,
        errorText,
        placeholder
    }) => {
    const [disabled, setDisabled] = useState(true);
    const [currentError, setError] = useState(error);

    const inputRef = useRef(null);

    const onIconClick = () => {
        setDisabled(false);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const onFocus = () => {
        setError(false);
    };

    const onBlur = () => {
        setError(error);
        setDisabled(true);
    };

    return (
        <Input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            icon='EditIcon'
            value={value}
            ref={inputRef}
            onFocus={onFocus}
            onBlur={onBlur}
            name={name}
            error={Boolean(currentError)}
            onIconClick={onIconClick}
            errorText={errorText}
            size='default'
        />
    );
};

export default EditInput;