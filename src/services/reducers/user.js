import {
    RESET_PASSWORD_PHASE,
    AUTH_ERROR,
    SET_USER,
    SET_USER_ERROR,
    REGISTER_ERROR,
    RESET_PASSWORD,
    RESET_PASSWORD_ERROR, LOGOUT
} from "../actions/user";

const initialState = {
    email: null,
    name: null,
    isAuthenticated: false,
    isUserLoaded: false,
    authError: false,
    passwordError: false,
    registerError: false,
    isResetPassword: false,
};


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                email: action.email,
                name: action.name,
                isAuthenticated: true,
                isUserLoaded: true,
                registerError: false,
                authError: false,
            }
        }
        case SET_USER_ERROR: {
            return {
                ...state,
                isAuthenticated: false,
                isUserLoaded: true,
            }
        }
        case REGISTER_ERROR: {
            return {
                ...state,
                registerError: action.code,
            }
        }
        case AUTH_ERROR: {
            return {
                ...state,
                authError: action.code,
            }
        }
        case RESET_PASSWORD: {
            return {
                ...state,
                isResetPassword: false,
                passwordError: false,
            }
        }
        case RESET_PASSWORD_ERROR: {
            return {
                ...state,
                passwordError: action.code,
                isResetPassword: false,
            }
        }
        case RESET_PASSWORD_PHASE: {
            return {
                ...state,
                isResetPassword: true,
            }
        }
        case LOGOUT: {
            return {
                ...initialState,
                isUserLoaded: true,
            }
        }
        default: {
            return state;
        }
    }
};
