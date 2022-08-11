import React, {useState} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../elements/link";
import UserForm from "../elements/user-form";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../services/actions/user";
import useForm from "../../hooks/useForm";


const errorMessage = {
    401: 'Пользователя не существет'
}

const Login = () => {
    const dispatch = useDispatch();
    const authError = useSelector(store => store.user.errors.authError);
    const {values, handleChange} = useForm({email: '', password: ''});

    const location = useLocation();
    const {from} = location.state || {from: {pathname: '/'}};

    const handleSubmit = async () => {
        dispatch(login(values));
    }

    return (
        <UserForm title="Вход" handleSubmit={handleSubmit}>
            <Input
                type='text'
                placeholder='E-mail'
                onChange={handleChange}
                value={values.email}
                name='email'
                error={Boolean(authError)}
                errorText={authError ? errorMessage[authError] : ''}
                size={'default'}
            />
            <PasswordInput
                value={values.password}
                name='password'
                onChange={handleChange}
            />
            <Button type="primary" size="medium">
                Войти
            </Button>
            <div className="mb-4 text text_type_main-default">
                <span className="question">Вы - новый пользователь? </span>
                <Link to={{
                    pathname: "/register",
                    state: {from}
                }} type="form">
                    Зарегистрироваться
                </Link>
            </div>
            <div className="text text_type_main-default">
                <span className="question">Забыли пароль? </span>
                <Link type="form" to="/forgot-password">Восстановить пароль</Link>
            </div>
        </UserForm>

    )
};

export default Login;