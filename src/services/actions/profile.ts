import {updateProfile} from "../api";
import {checkResponse} from "../../utils/util";
import {USER_REQUEST_SUCCESS} from "./user";
import {TUser} from "../../utils/types";
import {AppDispatch, RootState} from "../../index";
import {AppThunk} from "../../hooks";

export const SET_DEFAULT_VALUES: 'SET_DEFAULT_VALUES' = 'SET_DEFAULT_VALUES';
export const SET_PROFILE_FORM_VALUE: 'SET_PROFILE_FORM_VALUE' = 'SET_PROFILE_FORM_VALUE';
export const PROFILE_ERROR: 'PROFILE_ERROR' = 'PROFILE_ERROR';

interface ISetDefaultValues {
    readonly type: typeof SET_DEFAULT_VALUES;
    [props: string]: any;
}

interface ISetProfileFormValue {
    readonly type: typeof SET_PROFILE_FORM_VALUE;
    field: any;
    value: any;
}

interface IProfileError {
    readonly type: typeof PROFILE_ERROR;
    code: string;
}

export type TProfileActions = ISetDefaultValues | ISetProfileFormValue | IProfileError;

export const setProfileUser = (user: TUser) => {
    return {
        type: SET_DEFAULT_VALUES,
        ...user,
    };
}

export const saveForm: AppThunk = () => (dispatch: AppDispatch, getState: () => RootState) => {
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