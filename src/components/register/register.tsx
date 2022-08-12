import React, {FC} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../elements/link";
import UserForm from "../elements/user-form";
import {registrate} from "../../services/actions/user";
import useForm from "../../hooks/useForm";
import {TMessages} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../hooks";

const errorMessage: TMessages = {
    403: 'Пользователь уже существует'
}

const Register: FC = () => {
    const dispatch = useAppDispatch();
    const {values, handleChange} = useForm({name: '', email: '', password: ''});
    const {registerError} = useAppSelector(store => store.user.errors);

    const handleSubmit = () => {
        dispatch(registrate(values) as any);
    }

    return (
        <UserForm title="Регистрация" handleSubmit={handleSubmit}>
            <Input
                type='text'
                placeholder='Имя'
                onChange={handleChange}
                value={values.name}
                name='name'
                error={Boolean(registerError)}
                errorText={registerError ? errorMessage[String(registerError)] : ''}
                size={'default'}
            />
            <Input
                type='text'
                placeholder='E-mail'
                onChange={handleChange}
                value={values.email}
                name='email'
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <PasswordInput onChange={handleChange} name='password' value={values.password}/>
            {/* @ts-ignore */}
            <Button type="primary" size="medium">
                Зарегистрироваться
            </Button>
            <div className="mb-4 text text_type_main-default">
                <span className="question">Уже зарегистрированы?</span> <Link type="form" to="/login" text="Войти"/>
            </div>
        </UserForm>
    );
};

export default Register;