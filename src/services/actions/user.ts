import {signIn, registration as registrationUser, getUser, signOut} from "../auth";
import {forgotPasswordUser, resetPasswordUser} from "../api";
import {checkResponse, getCookie} from "../../utils/util";

export const USER_REQUEST_SUCCESS = 'USER_REQUEST_SUCCESS';
export const USER_REQUEST = 'USER_REQUEST';

export const USER_REQUEST_ERROR = 'USER_REQUEST_ERROR';
export const AUTH_REQUEST_ERROR = 'AUTH_ERROR';
export const REGISTER_REQUEST_ERROR = 'REGISTER_ERROR';
export const RESET_PASSWORD_ERROR = 'PASSWORD_ERROR';
export const  FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';


export const RESET_PASSWORD_PHASE = 'RESET_PASSWORD_PHASE';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const LOGOUT = 'LOGOUT';
export const NO_USER = 'NO_USER';

type Form = {
    [props: string]: any
}

export const registrate = (form: Form) => (dispatch: any) => {
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

export const authenticate = () => (dispatch: any) => {
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

export const login = (form: Form) => (dispatch: any) =>
    signIn(form).then((data) => {
        if (data.success) {
            dispatch({type: USER_REQUEST_SUCCESS, ...data.user, id: data.user._id});
        } else {
            return Promise.reject(data);
        }
    }).catch(e => {
        dispatch({type: AUTH_REQUEST_ERROR, code: e.status});
    });


export const forgotPassword = ({email}: Form) => (dispatch: any) => {
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

export const resetPassword = (form: Form) => (dispatch: any) => {
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

export const logout = () => (dispatch: any) =>
    signOut().then((data) => {
        dispatch({type: LOGOUT});
    }).catch(e => {
       console.log('Server Error')
    });
