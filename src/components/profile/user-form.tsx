import React, {ChangeEvent, FC, SyntheticEvent, useEffect} from "react";
import formStyles from "./user-form.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import EditInput from "../elements/edit-input";
import {saveForm, SET_PROFILE_FORM_VALUE, setProfileUser} from "../../services/actions/profile";
import {TMessages} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../hooks";

const errorMessage: TMessages = {
    403: 'Некорректные данные'
}

const UserForm: FC = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(store => store.user);
    const {form, error} = useAppSelector(store => store.profile);
    const { isDirty } = useAppSelector(store => store.profile.form);

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(saveForm() as any);
    };

    useEffect(() => {
        dispatch(setProfileUser(user));
    }, [user]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: SET_PROFILE_FORM_VALUE, field: e.target.name, value: e.target.value
        })
    };

    const handleCancelClick = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(setProfileUser(user));
    }

    if (!form) {
        return null;
    }

    return (
        <div className={formStyles.wrap}>
            <form className={formStyles.form} onSubmit={handleSubmit}>
                <EditInput
                    type='text'
                    placeholder='Имя'
                    onChange={onChange}
                    value={form.name}
                    name='name'
                    error={Boolean(error)}
                    errorText={error ? errorMessage[error] : ''}
                />
                <EmailInput
                    // @ts-ignore
                    type='text'
                    placeholder='E-mail'
                    onChange={onChange}
                    value={form.email}
                    name='email'
                    size={'default'}
                    icon="EditIcon"
                />
                <EditInput
                    placeholder='Пароль'
                    onChange={onChange}
                    value={form.password}
                    name='password'
                    type="password"
                />
                {isDirty &&
                    <div className={formStyles.buttons}>
                        {/* @ts-ignore */}
                        <Button type="primary" size="medium">
                            Сохранить
                        </Button>
                        {/* @ts-ignore */}
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