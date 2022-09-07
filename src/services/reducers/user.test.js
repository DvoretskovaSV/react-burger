import { userReducer } from './user';
import {
    AUTH_REQUEST_ERROR, FORGOT_PASSWORD_ERROR,
    LOGOUT,
    NO_USER, REGISTER_REQUEST_ERROR,
    RESET_PASSWORD, RESET_PASSWORD_ERROR,
    RESET_PASSWORD_PHASE,
    USER_REQUEST_SUCCESS
} from "../actions/user";
import {initialState} from "./user";

const errorCode = 666;
const user = {
    email: 'name@email.com',
    name: 'name',
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
                    registerError: errorCode,
                    authError: undefined,
                },
            }, {
                type: USER_REQUEST_SUCCESS,
                ...user,
            })
        ).toEqual({
            ...initialState,
            user,
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
                    passwordError: errorCode,
                },
                isResetPassword: true,
            }, {
                type: RESET_PASSWORD,
            })
        ).toEqual({
            ...initialState,
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
            userReducer(initialState, {
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
                code: errorCode,
            })
        ).toEqual({
            ...initialState,
            isAuthenticated: false,
            isUserLoading: false,
            errors: {
                ...initialState.errors,
                authError: errorCode,
            }
        })
    });

    it('should handle REGISTER_REQUEST_ERROR', () => {
        expect(
            userReducer({
                ...initialState
            }, {
                type: REGISTER_REQUEST_ERROR,
                code: errorCode,
            })
        ).toEqual({
            ...initialState,
            errors: {
                ...initialState.errors,
                registerError: errorCode,
            }
        })
    });

    it('should handle RESET_PASSWORD_ERROR', () => {
        expect(
            userReducer({
                ...initialState,
                user,
                errors: {
                    ...initialState.errors,
                },
            }, {
                type: RESET_PASSWORD_ERROR,
                code: errorCode,
            })
        ).toEqual({
            ...initialState,
            user,
            isResetPassword: true,
            errors: {
                ...initialState.errors,
                passwordError: errorCode,
            },

        })
    });

    it('should handle FORGOT_PASSWORD_ERROR', () => {
        expect(
            userReducer(initialState, {
                type: FORGOT_PASSWORD_ERROR,
                code: errorCode,
            })
        ).toEqual({
            ...initialState,
            errors: {
                ...initialState.errors,
                forgoPasswordError: errorCode,
            }
        })
    });
});