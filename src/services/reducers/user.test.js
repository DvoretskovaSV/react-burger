import { userReducer } from './user';
import {
    AUTH_REQUEST_ERROR, FORGOT_PASSWORD_ERROR,
    LOGOUT,
    NO_USER, REGISTER_REQUEST_ERROR,
    RESET_PASSWORD, RESET_PASSWORD_ERROR,
    RESET_PASSWORD_PHASE,
    USER_REQUEST_SUCCESS
} from "../actions/user";

const initialState = {
    user: {
        email: null,
        name: null,
    },
    errors: {
        authError: false,
        passwordError: false,
        registerError: false,
        forgotError: false,
        forgoPasswordError: false,
    },
    isAuthenticated: false,
    isUserLoading: true,
    isResetPassword: false,
};

describe('user reducer', () => {

    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    });

    it('should handle NO_USER', () => {
        expect(
            userReducer({
                ...initialState,
                isUserLoading: true,
                isAuthenticated: true,
            }, {
                type: NO_USER,
            })
        ).toEqual({
            ...initialState,
            isUserLoading: false,
            isAuthenticated: false,
        })
    });

    it('should handle USER_REQUEST_SUCCESS', () => {
        expect(
            userReducer({
                ...initialState,
                errors: {
                    ...initialState.errors,
                    registerError: 401,
                    authError: undefined,
                },
            }, {
                type: USER_REQUEST_SUCCESS,
                email: 'name@email.com',
                name: 'name',
            })
        ).toEqual({
            user: {
                email: 'name@email.com',
                name: 'name',
            },
            errors: {
                authError: false,
                passwordError: false,
                registerError: false,
                forgotError: false,
                forgoPasswordError: false,
            },
            isAuthenticated: true,
            isUserLoading: false,
            isResetPassword: false,
        })
    });

    it('should handle RESET_PASSWORD', () => {
        expect(
            userReducer({
                ...initialState,
                errors: {
                    ...initialState.errors,
                    passwordError: 666,
                },
                isResetPassword: true,
            }, {
                type: RESET_PASSWORD,
            })
        ).toEqual({
            ...initialState,
            errors: {
                ...initialState.errors,
                passwordError: false,
            },
            isResetPassword: false,
        })
    });

    it('should handle RESET_PASSWORD_PHASE', () => {
        expect(
            userReducer(initialState, {
                type: RESET_PASSWORD_PHASE,
            })
        ).toEqual({
            ...initialState,
            isResetPassword: true,
        })
    });

    it('should handle LOGOUT', () => {
        expect(
            userReducer({
                ...initialState
            }, {
                type: LOGOUT,
            })
        ).toEqual({
            ...initialState,
            isUserLoading: false,
        })
    });

    it('should handle AUTH_REQUEST_ERROR', () => {
        expect(
            userReducer({
                ...initialState
            }, {
                type: AUTH_REQUEST_ERROR,
                code: 666,
            })
        ).toEqual({
            ...initialState,
            isAuthenticated: false,
            isUserLoading: false,
            errors: {
                ...initialState.errors,
                authError: 666,
            }
        })
    });

    it('should handle REGISTER_REQUEST_ERROR', () => {
        expect(
            userReducer({
                ...initialState
            }, {
                type: REGISTER_REQUEST_ERROR,
                code: 666,
            })
        ).toEqual({
            ...initialState,
            errors: {
                ...initialState.errors,
                registerError: 666,
            }
        })
    });

    it('should handle RESET_PASSWORD_ERROR', () => {
        expect(
            userReducer({
                user: {
                    email: 'name',
                    name: 'name@email.com',
                },
                errors: {
                    authError: true,
                    passwordError: false,
                    registerError: false,
                    forgotError: false,
                    forgoPasswordError: false,
                },
                isAuthenticated: false,
                isUserLoading: true,
                isResetPassword: false,
            }, {
                type: RESET_PASSWORD_ERROR,
                code: 666,
            })
        ).toEqual({
            user: {
                email: 'name',
                name: 'name@email.com',
            },
            errors: {
                authError: true,
                passwordError: 666,
                registerError: false,
                forgotError: false,
                forgoPasswordError: false,
            },
            isAuthenticated: false,
            isUserLoading: true,
            isResetPassword: true,
        })
    });

    it('should handle FORGOT_PASSWORD_ERROR', () => {
        expect(
            userReducer({
                ...initialState
            }, {
                type: FORGOT_PASSWORD_ERROR,
                code: 666,
            })
        ).toEqual({
            ...initialState,
            errors: {
                ...initialState.errors,
                forgoPasswordError: 666,
            }
        })
    });
});