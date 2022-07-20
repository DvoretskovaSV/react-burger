import {
    AUTHENTICATE_URL,
    FORGOT_PASSWORD_URL,
    LOGIN_URL,
    LOGOUT_URL,
    REFRESH_TOKEN_URL,
    REGISTRATION_URL,
    RESET_PASSWORD_URL,
    UPDATE_PROFILE
} from "../utils/constants";
import {getCookie} from "../utils/util";


export const registrationRequest = async ({email, password, name}) =>
    await fetch(REGISTRATION_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({email, password, name})
    });


export const loginRequest = async ({email, password}) =>
    await fetch(LOGIN_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({email, password})
    });


export const authenticateRequest = async () => {
    const token = getCookie('token');

    if (!token) return Promise.resolve();

    return await fetch(AUTHENTICATE_URL, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
}


export const logoutRequest = async () =>
    await fetch(LOGOUT_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({token: getCookie('refreshToken')})
    });


export const refreshTokenRequest = async () =>
    await fetch(REFRESH_TOKEN_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({token: getCookie('refreshToken')})
    });


export const updateProfile = async (values) =>
    await fetch(UPDATE_PROFILE, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(values)
    });


export const forgotPasswordUser = async (email) =>
    await fetch(FORGOT_PASSWORD_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({email})
    });


export const resetPasswordUser = async (values) =>
    await fetch(RESET_PASSWORD_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(values)
    });
