import React, {useState, useEffect} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../elements/link";
import UserForm from "../elements/user-form";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword} from "../../services/actions/user";
import {useHistory} from "react-router-dom";
import useForm from "../../hooks/useForm";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const isResetPassword = useSelector(store => store.user.isResetPassword);
    const history = useHistory();
    const {values, handleChange} = useForm({email: ''});

    useEffect(() => {
        if (isResetPassword) {
            history.replace("/reset-password");
        }
    }, [isResetPassword])


    const handleSubmit = () => {
        dispatch(forgotPassword(values));
    };

    return (
        <UserForm title="Восстановление пароля" handleSubmit={handleSubmit}>
            <Input
                type='email'
                placeholder={'Укажите e-mail'}
                onChange={handleChange}
                value={values.email}
                name='email'
                size='default'
            />
            <Button type="primary" size="medium">
                Восстановить
            </Button>
            <div className="text text_type_main-default">
                <span className="question">Вспомнили пароль? </span>
                <Link type="form" to="/login">Войти</Link>
            </div>
        </UserForm>
    )
};

export default ForgotPassword;