import {
    authenticateRequest, loginRequest, logoutRequest, refreshTokenRequest, registrationRequest,
} from './api';
import {checkResponse, deleteCookie, setCookie} from "../utils/util";

export const getUser = async () => await authenticateRequest()
    .then(checkResponse);


export const registration = async (form) => await registrationRequest(form)
    .then(checkResponse).then(res => {
        if (res.accessToken) {
            setTokens({...res})
        }

        return res;
    })
    .then(data => data);


export const signIn = async form => await loginRequest(form)
    .then(checkResponse).then(res => {
        if (res.accessToken) {
            setTokens({...res})
        }

        return res;
    });


export const signOut = async () => {
    deleteCookie('token');
    await logoutRequest();
    deleteCookie('refreshToken');
};


export const refreshToken = async () => await refreshTokenRequest()
    .then(checkResponse).then(res => {
        if (res.accessToken) {
            setTokens(res);
        }

        return res;
    });


const setTokens = ({accessToken, refreshToken}) => {
    deleteCookie('token');
    deleteCookie('refreshToken');

    setCookie('token', parseBearerToken(accessToken));
    setCookie('refreshToken', refreshToken);
}

const parseBearerToken = (token) => token.split('Bearer ')[1];
