import React, {FC} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../elements/link";
import UserForm from "../elements/user-form";
import {useLocation} from "react-router-dom";
import {login} from "../../services/actions/user";
import useForm from "../../hooks/useForm";
import {TMessages} from "../../utils/types";
import {Location} from "history";
import {useAppDispatch, useAppSelector} from "../../hooks";

type LocationType = {
    from: Location;
    state: LocationType;
    pathname: string;
};

const errorMessage: TMessages = {
    401: 'Пользователя не существет'
}

const Login: FC = () => {
    const dispatch = useAppDispatch();
    const {authError} = useAppSelector(store => store.user.errors);
    const {values, handleChange} = useForm({email: '', password: ''});

    const location = useLocation<LocationType>();
    const { from } = location.state || {from: {pathname: '/'}};

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
                errorText={authError ? errorMessage[String(authError)] : ''}
                size={'default'}
            />
            <PasswordInput
                value={values.password}
                name='password'
                onChange={handleChange}
            />
            {/* @ts-ignore */}
            <Button type="primary" size="medium">
                Войти
            </Button>
            <div className="mb-4 text text_type_main-default">
                <span className="sub_text">Вы - новый пользователь? </span>
                <Link to={{
                        pathname: "/register",
                        state: {from}
                    }}
                      type="form"
                      text="Зарегистрироваться"/>
            </div>
            <div className="text text_type_main-default">
                <span className="sub_text">Забыли пароль? </span>
                <Link type="form" to="/forgot-password" text="Восстановить пароль" />
            </div>
        </UserForm>

    )
};

export default Login;