import React, {useState, useEffect} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../elements/link";
import UserForm from "../elements/user-form";
import {useDispatch, useSelector} from "react-redux";
import {registrate} from "../../services/actions/user";
const errorMessage = {
    403: 'Пользователь уже существует'
}

const Register = () => {
    const dispatch = useDispatch();
    const [form, setValue] = useState({name: '', email: '', password: ''});
    const registerError = useSelector(store => store.user.registerError);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registrate(form));
    }

    return <UserForm title="Регистрация" handleSubmit={handleSubmit}>
            <Input
                type='text'
                placeholder='Имя'
                onChange={onChange}
                value={form.name}
                name='name'
                error={Boolean(registerError)}
                errorText={registerError ? errorMessage[registerError] : ''}
                size={'default'}
            />
            <Input
                type='text'
                placeholder='E-mail'
                onChange={onChange}
                value={form.email}
                name='email'
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <PasswordInput onChange={onChange} name='password' value={form.password}/>
            <Button type="primary" size="medium">
                Зарегистрироваться
            </Button>
            <div className="mb-4 text text_type_main-default">
                <span className="question">Уже зарегистрированы?</span> <Link type="form" to="/login">Войти</Link>
            </div>
        </UserForm>;
};

export default Register;