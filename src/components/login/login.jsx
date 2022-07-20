import React, {useState} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../elements/link";
import UserForm from "../elements/user-form";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../services/actions/user";

const errorMessage = {
    401: 'Пользователя не существет'
}

const Login = () => {
    const dispatch = useDispatch();
    const authError = useSelector(store => store.user.authError);

    const [form, setValue] = useState({email: '', password: ''});

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const handleSubmit = async () => {
        dispatch(login(form));
    }

    return <>
        <UserForm title="Вход" handleSubmit={handleSubmit}>
            <Input
                type='text'
                placeholder='E-mail'
                onChange={onChange}
                value={form.email}
                name='email'
                error={Boolean(authError)}
                errorText={authError ? errorMessage[authError] : ''}
                size={'default'}
            />
            <PasswordInput
                value={form.password}
                name='password'
                onChange={onChange}
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
    </>
};

export default Login;