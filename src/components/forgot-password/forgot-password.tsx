import React, {useEffect, FC} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../elements/link";
import UserForm from "../elements/user-form";
import {forgotPassword} from "../../services/actions/user";
import {useHistory} from "react-router-dom";
import useForm from "../../hooks/useForm";
import {useAppDispatch, useAppSelector} from "../../hooks";

const ForgotPassword: FC = () => {
    const dispatch = useAppDispatch();
    const { isResetPassword } = useAppSelector(store => store.user);
    const history = useHistory();
    const {values, handleChange} = useForm({email: ''});

    useEffect(() => {
        if (isResetPassword) {
            history.replace("/reset-password");
        }
    }, [isResetPassword])


    const handleSubmit = () => {
        dispatch(forgotPassword(values) as any);
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
            {/* @ts-ignore */}
            <Button type="primary" size="medium">
                Восстановить
            </Button>
            <div className="text text_type_main-default">
                <span className="question">Вспомнили пароль? </span>
                <Link type="form" to="/login" text="Войти" />
            </div>
        </UserForm>
    )
};

export default ForgotPassword;