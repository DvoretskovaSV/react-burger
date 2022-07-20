import React, {useEffect, useState} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../elements/link";
import UserForm from "../elements/user-form";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {resetPassword} from "../../services/actions/user";

const errorMessage = {
    404: 'Некорректный токен'
}

const ResetPassword = () => {
    const dispatch = useDispatch();
    const passwordError = useSelector(store => store.user.passwordError);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const [form, setValue] = useState({password: '', token: ''});

    const handleSubmit = () => {
        dispatch(resetPassword(form))
    }

    return <>
        <UserForm title="Восстановление пароля" handleSubmit={handleSubmit}>
            <PasswordInput
                onChange={onChange}
                value={form.password}
                name='password'
            />
            <Input
                type='text'
                placeholder='Введите код из письма'
                onChange={onChange}
                value={form.token}
                name='token'
                error={Boolean(passwordError)}
                errorText={passwordError ? errorMessage[passwordError] : ''}
                size='default'
            />
            <Button type="primary" size="medium">
                Сохранить
            </Button>
            <div className="text text_type_main-default">
                <span className="question">Вспомнили пароль? </span>
                <Link type="form" to="/login">Войти</Link>
            </div>
        </UserForm>
    </>
};

export default ResetPassword;