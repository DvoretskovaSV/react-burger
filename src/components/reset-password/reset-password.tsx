import React, {FC} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../elements/link";
import UserForm from "../elements/user-form";
import {resetPassword} from "../../services/actions/user";
import useForm from "../../hooks/useForm";
import {TMessages} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../hooks";

const errorMessage: TMessages = {
    404: 'Некорректный токен'
}

const ResetPassword: FC = () => {
    const dispatch = useAppDispatch();
    const {passwordError} = useAppSelector(store => store.user.errors);
    const {values, handleChange} = useForm({password: '', token: ''});

    const handleSubmit = () => {
        dispatch(resetPassword(values))
    }

    return (
        <UserForm title="Восстановление пароля" handleSubmit={handleSubmit}>
            <PasswordInput
                onChange={handleChange}
                value={values.password}
                name='password'
            />
            <Input
                type='text'
                placeholder='Введите код из письма'
                onChange={handleChange}
                value={values.token}
                name='token'
                error={Boolean(passwordError)}
                errorText={passwordError ? errorMessage[String(passwordError)] : ''}
                size='default'
            />
            {/* @ts-ignore */}
            <Button type="primary" size="medium">
                Сохранить
            </Button>
            <div className="text text_type_main-default">
                <span className="sub_text">Вспомнили пароль? </span>
                <Link type="form" to="/login" text="Войти" />
            </div>
        </UserForm>
    )
};

export default ResetPassword;