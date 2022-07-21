import React, {useEffect, useState} from "react";
import formStyles from "./user-form.module.css";
import {Button, Input, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import EditInput from "../elements/edit-input";
import {useDispatch, useSelector} from "react-redux";
import {saveForm, SET_PROFILE_FORM_VALUE, setProfileUser} from "../../services/actions/profile";

const errorMessage = {
    403: 'Некорректные данные'
}

const UserForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.user);
    const profile = useSelector(store => store.profile.form);
    const isDirty = useSelector(store => store.profile.form.isDirty);
    const error = useSelector(store => store.profile.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveForm());
    };

    useEffect(() => {
        dispatch(setProfileUser(user));
    }, [user]);

    const onChange = e => {
        dispatch({
            type: SET_PROFILE_FORM_VALUE, field: e.target.name, value: e.target.value
        })
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        dispatch(setProfileUser(user));
    }

    if (!profile) {
        return null;
    }

    return (
        <div className={formStyles.wrap}>
            <form className={formStyles.form} onSubmit={handleSubmit}>
                <EditInput
                    type='text'
                    placeholder='Имя'
                    onChange={onChange}
                    value={profile.name}
                    name='name'
                    error={Boolean(error)}
                    errorText={error ? errorMessage[error] : ''}
                />
                <EmailInput
                    type='text'
                    placeholder='E-mail'
                    onChange={onChange}
                    value={profile.email}
                    name='email'
                    size={'default'}
                    icon="EditIcon"
                />
                <EditInput
                    placeholder='Пароль'
                    onChange={onChange}
                    value={profile.password}
                    name='password'
                    type="password"
                />
                {isDirty &&
                    <div className={formStyles.buttons}>
                        <Button type="primary" size="medium">
                            Сохранить
                        </Button>

                        <Button type="primary" size="medium" onClick={handleCancelClick}>
                            Отмена
                        </Button>
                    </div>
                }
            </form>
        </div>
    )
};

export default UserForm;