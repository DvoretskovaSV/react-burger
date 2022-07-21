import React from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../elements/link";
import UserForm from "../elements/user-form";
import {useDispatch, useSelector} from "react-redux";
import {registrate} from "../../services/actions/user";
import useForm from "../../hooks/useForm";
const errorMessage = {
    403: 'Пользователь уже существует'
}

const Register = () => {
    const dispatch = useDispatch();
    const {values, handleChange} = useForm({name: '', email: '', password: ''});
    const registerError = useSelector(store => store.user.errors.registerError);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registrate(values));
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
                errorText={registerError ? errorMessage[registerError] : ''}
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
            <Button type="primary" size="medium">
                Зарегистрироваться
            </Button>
            <div className="mb-4 text text_type_main-default">
                <span className="question">Уже зарегистрированы?</span> <Link type="form" to="/login">Войти</Link>
            </div>
        </UserForm>
    );
};

export default Register;