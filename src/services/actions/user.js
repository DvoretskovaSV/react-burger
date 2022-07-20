import {signIn, registration as registrationUser, getUser, signOut} from "../auth";
import {forgotPasswordUser, resetPasswordUser} from "../api";
import {useHistory} from "react-router-dom";
import {checkResponse} from "../../utils/util";

export const SET_USER = 'SET_USER';
export const SET_USER_ERROR = 'SET_USER_ERROR';
export const AUTH_ERROR = 'AUTH_ERROR';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const RESET_PASSWORD_ERROR = 'PASSWORD_ERROR';

export const RESET_PASSWORD_PHASE = 'RESET_PASSWORD_PHASE';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const LOGOUT = 'LOGOUT';

export const registrate = (form) => (dispatch) => {
    registrationUser(form).then((data) => {
        if (data.success) {
            dispatch({type: SET_USER, ...data.user, id: data.user._id});
        } else {
            dispatch({type: REGISTER_ERROR, code: data.status});
        }
    }).catch(e => {
        dispatch({type: REGISTER_ERROR, code: e.status});
    });
}

export const authenticate = () => (dispatch) => {
    getUser().then((data) => {
        if (data.success) {
            dispatch({type: SET_USER, ...data.user, id: data.user._id});
        } else {
            dispatch({type: SET_USER_ERROR});
        }
    });
}

export const login = (form) => (dispatch) => {
    signIn(form).then((data) => {
        if (data.success) {
            dispatch({type: SET_USER, ...data.user, id: data.user._id});
        }
    }).catch(e => {
        dispatch({type: AUTH_ERROR, code: e.status});
    });
}

export const forgotPassword = (email) => (dispatch) => {
    forgotPasswordUser(email).then(checkResponse).then((data) => {
        if (data.success) {
            dispatch({type: RESET_PASSWORD_PHASE});
        }
    })
};

export const resetPassword = (form) => (dispatch) => {
    resetPasswordUser(form).then((data) => {
        if (data.success) {
            dispatch({type: RESET_PASSWORD});
        } else {
            dispatch({type: RESET_PASSWORD_ERROR, code: data.status});
        }
    }).catch(e => {
        dispatch({type: RESET_PASSWORD_ERROR, code: e.status});
    });
}

export const logout = () => (dispatch) =>
    signOut().then(() => {
        dispatch({type: LOGOUT});
    });
