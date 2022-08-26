const BASE_URL = 'https://norma.nomoreparties.space/api';

export const INGREDIENTS_URL = `${BASE_URL}/ingredients`;
export const MAKE_ORDER_URL = `${BASE_URL}/orders`;

const AUTH_URL = `${BASE_URL}/auth`;

export const REGISTRATION_URL = `${AUTH_URL}/register`;
export const LOGIN_URL = `${AUTH_URL}/login`;
export const LOGOUT_URL = `${AUTH_URL}/logout`;
export const FORGOT_PASSWORD_URL = `${BASE_URL}/password-reset`;
export const RESET_PASSWORD_URL = `${FORGOT_PASSWORD_URL}/reset`;


export const REFRESH_TOKEN_URL = `${AUTH_URL}/token`;
export const AUTHENTICATE_URL = `${AUTH_URL}/user`;

export const UPDATE_PROFILE = `${AUTH_URL}/user`;

