import {signIn, registration as registrationUser, getUser, signOut} from "../auth";
import {forgotPasswordUser, resetPasswordUser} from "../api";
import {checkResponse, getCookie} from "../../utils/util";
import {AppDispatch} from "../../index";
import {AppThunk} from "../../hooks";
import {
    GET_INGREDIENTS_ERROR,
    IGetIngredients,
    IGetIngredientsFailedAction,
    IGetIngredientsSuccessAction
} from "./ingredients";

export const USER_REQUEST_SUCCESS: 'USER_REQUEST_SUCCESS' = 'USER_REQUEST_SUCCESS';
export const USER_REQUEST: 'USER_REQUEST' = 'USER_REQUEST';

export const USER_REQUEST_ERROR: 'USER_REQUEST_ERROR' = 'USER_REQUEST_ERROR';
export const AUTH_REQUEST_ERROR: 'AUTH_ERROR' = 'AUTH_ERROR';
export const REGISTER_REQUEST_ERROR: 'REGISTER_ERROR' = 'REGISTER_ERROR';
export const RESET_PASSWORD_ERROR: 'PASSWORD_ERROR' = 'PASSWORD_ERROR';
export const FORGOT_PASSWORD_ERROR: 'FORGOT_PASSWORD_ERROR' = 'FORGOT_PASSWORD_ERROR';


export const RESET_PASSWORD_PHASE: 'RESET_PASSWORD_PHASE' = 'RESET_PASSWORD_PHASE';
export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';
export const LOGOUT: 'LOGOUT' = 'LOGOUT';
export const NO_USER: 'NO_USER' = 'NO_USER';

type Form = {
    [props: string]: any
}

export interface IUserRequest {
    readonly type: typeof USER_REQUEST;
}

export interface IUserRequestSuccess {
    readonly type: typeof USER_REQUEST_SUCCESS;
    email: string;
    name: string;
}

export interface IUserRequestError {
    readonly type: typeof USER_REQUEST_ERROR;
}

export interface IAuthRequestError {
    readonly type: typeof AUTH_REQUEST_ERROR;
    code: string;
}

export interface IRegisterRequestError {
    readonly type: typeof REGISTER_REQUEST_ERROR;
    code: string;
}

export interface IResetPasswordError {
    readonly type: typeof RESET_PASSWORD_ERROR;
    code: string;
}

export interface IForgotPasswordError {
    readonly type: typeof FORGOT_PASSWORD_ERROR;
    code?: string | boolean;
}

export interface IResetPasswordPhase {
    readonly type: typeof RESET_PASSWORD_PHASE;
}

export interface IResetPassword {
    readonly type: typeof RESET_PASSWORD;
}

export interface ILogout {
    readonly type: typeof LOGOUT;
}

export interface INoUser {
    readonly type: typeof NO_USER;
}


export type TUserActions =
    IUserRequest
    | IUserRequestSuccess
    | IUserRequestError
    | IAuthRequestError
    | IRegisterRequestError
    | IResetPasswordError
    | IForgotPasswordError
    | IResetPasswordPhase
    | IResetPassword
    | ILogout
    | INoUser;

export const registrate: AppThunk = (form: Form) => (dispatch: AppDispatch) => {
    registrationUser(form).then((data) => {
        if (data.success) {
            dispatch({type: USER_REQUEST_SUCCESS, ...data.user, id: data.user._id});
        } else {
            return Promise.reject(data);
        }
    }).catch(e => {
        dispatch({type: REGISTER_REQUEST_ERROR, code: e.status});
    });
}

export const authenticate: AppThunk = () => (dispatch: AppDispatch) => {
    const token = getCookie('token');

    if (!token) {
        dispatch({type: NO_USER});
        return;
    }

    dispatch({type: USER_REQUEST});

    getUser().then((data) => {
        if (data.success) {
            dispatch({type: USER_REQUEST_SUCCESS, ...data.user, id: data.user._id});
        } else {
            return Promise.reject(data);
        }
    }).catch(e => {
        dispatch({type: USER_REQUEST_ERROR});
    });
}

export const login: AppThunk = (form: Form) => (dispatch: AppDispatch) =>
    signIn(form).then((data) => {
        if (data.success) {
            dispatch({type: USER_REQUEST_SUCCESS, ...data.user, id: data.user._id});
        } else {
            return Promise.reject(data);
        }
    }).catch(e => {
        dispatch({type: AUTH_REQUEST_ERROR, code: e.status});
    });

export const forgotPassword: AppThunk = ({email}: Form) => (dispatch: AppDispatch) => {
    forgotPasswordUser(email).then(checkResponse).then((data) => {
        if (data.success) {
            dispatch({type: RESET_PASSWORD_PHASE});
        } else {
            return Promise.reject(data);
        }
    }).catch(e => {
        dispatch({type: FORGOT_PASSWORD_ERROR});
    });
};

export const resetPassword: AppThunk = (form: Form) => (dispatch: AppDispatch) => {
    resetPasswordUser(form).then(checkResponse).then((data) => {
        if (data.success) {
            dispatch({type: RESET_PASSWORD});
        } else {
            return Promise.reject(data);
        }
    }).catch(e => {
        dispatch({type: RESET_PASSWORD_ERROR, code: e.status});
    });
}

export const logout: AppThunk = () => (dispatch: AppDispatch) =>
    signOut().then((data) => {
        dispatch({type: LOGOUT});
    }).catch(e => {
       console.log('Server Error')
    });
