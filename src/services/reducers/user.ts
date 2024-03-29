import {
    RESET_PASSWORD_PHASE,
    RESET_PASSWORD,
    RESET_PASSWORD_ERROR,
    LOGOUT,
    USER_REQUEST_SUCCESS,
    NO_USER,
    AUTH_REQUEST_ERROR,
    REGISTER_REQUEST_ERROR, FORGOT_PASSWORD_ERROR, TUserActions
} from "../actions/user";
import {TUser} from "../../utils/types";


type Errors = {
    [props: string]: boolean | string | unknown;
}

interface IState<T = TUser, E = Errors> {
    user: T;
    errors: E;
    isAuthenticated: boolean,
    isUserLoading: boolean,
    isResetPassword: boolean,
}

export const initialState: IState = {
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


export const userReducer = (state = initialState, action: TUserActions): IState => {
    switch (action.type) {
        case NO_USER: {
            return {
                ...initialState,
                isUserLoading: false,
                isAuthenticated: false,
            }
        }
        case USER_REQUEST_SUCCESS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.email,
                    name: action.name,
                },
                errors: {
                    ...state.errors,
                    registerError: false,
                    authError: false,
                },
                isAuthenticated: true,
                isUserLoading: false,
            }
        }

        case RESET_PASSWORD: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    passwordError: false,
                },
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
                isUserLoading: false,
            }
        }
        case AUTH_REQUEST_ERROR: {
            return {
                ...state,
                isAuthenticated: false,
                isUserLoading: false,
                errors: {
                    ...state.errors,
                    authError: action.code,
                }
            }
        }
        case REGISTER_REQUEST_ERROR: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    registerError: action.code,
                }
            }
        }
        case RESET_PASSWORD_ERROR: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    passwordError: action.code,
                },
                isResetPassword: true,
            }
        }
        case FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    forgoPasswordError: action.code,
                },
            }
        }
        default: {
            return state;
        }
    }
};
