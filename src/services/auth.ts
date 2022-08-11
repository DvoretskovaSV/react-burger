import {
    authenticateRequest, loginRequest, logoutRequest, refreshTokenRequest, registrationRequest,
} from './api';
import {checkResponse, deleteCookie, setCookie} from "../utils/util";
import {Form, TToken} from "../utils/types";

export const getUser = async () => await authenticateRequest()
    .then(checkResponse);


export const registration = async (form: Form) => await registrationRequest(form)
    .then(checkResponse).then(res => {
        if (res.accessToken) {
            setTokens({...res as TToken})
        }

        return res;
    })
    .then(data => data);


export const signIn = async (form: Form) => await loginRequest(form)
    .then(checkResponse).then(res => {
        if (res.accessToken) {
            setTokens({...res as TToken})
        }

        return res;
    });


export const signOut = async () =>
    await logoutRequest().then(checkResponse).then((res) => {
        deleteCookie('token');
        deleteCookie('refreshToken');

        return res;
    });


export const refreshToken = async () => await refreshTokenRequest()
    .then(checkResponse).then(res => {
        if (res.accessToken) {
            setTokens(res as TToken);
        }

        return res;
    });


const setTokens = ({accessToken, refreshToken}: TToken) => {
    deleteCookie('token');
    deleteCookie('refreshToken');

    setCookie('token', parseBearerToken(accessToken));
    setCookie('refreshToken', refreshToken);
}

const parseBearerToken = ((token: string): string => token.split('Bearer ')[1]);
