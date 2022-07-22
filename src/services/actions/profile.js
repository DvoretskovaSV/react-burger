import {updateProfile} from "../api";
import {checkResponse} from "../../utils/util";
import {SET_USER, USER_REQUEST_SUCCESS} from "./user";

export const SET_DEFAULT_VALUES = 'SET_DEFAULT_VALUES';
export const SET_PROFILE_FORM_VALUE = 'SET_PROFILE_FORM_VALUE';
export const PROFILE_ERROR = 'PROFILE_ERROR';

export const setProfileUser = (user) => {
    return {
        type: SET_DEFAULT_VALUES,
        ...user,
    };
}

export const saveForm = () => (dispatch, getState) => {
    const {form} = getState().profile;

    updateProfile(form)
        .then(checkResponse)
        .then((data) => {
        dispatch({
            type: USER_REQUEST_SUCCESS,
            ...data.user,
        });

        dispatch({
            type: SET_DEFAULT_VALUES,
            ...data.user,
        });
    }).catch(e => {
        dispatch({
            type: PROFILE_ERROR,
            code: e.status,
        });
    });
}