import React, {FC, useRef, useState} from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

type TProps = {
    value: string,
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    name: string,
    type?: 'text' | 'email' | 'password';
    error?: boolean,
    errorText?: string,
    placeholder: string,
};

const EditInput: FC<TProps> = ({
        value,
        onChange,
        name,
        type,
        error,
        errorText,
        placeholder
    }) => {
    const [disabled, setDisabled] = useState(true);

    const inputRef = useRef<HTMLInputElement>(null);

    const onIconClick = () => {
        setDisabled(false);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const onBlur = () => {
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
            onBlur={onBlur}
            name={name}
            error={Boolean(error)}
            onIconClick={onIconClick}
            errorText={errorText}
            size='default'
        />
    );
};

export default EditInput;