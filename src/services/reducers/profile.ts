import {PROFILE_ERROR, SET_DEFAULT_VALUES, SET_PROFILE_FORM_VALUE, TProfileActions} from "../actions/profile";

type Form = {
    [props: string]: any
}

interface IState<T = Form> {
    form: T;
    error: string | null;
}

export const initialState: IState = {
    form: {
        name: '',
        email: '',
        password: '',
        isDirty: false,
    },
    error: null,
}

export const profileReducer = (state = initialState, action: TProfileActions): IState => {
    switch (action.type) {
        case SET_DEFAULT_VALUES: {
            const values: Form = {};

            for (const key in action) {
                if (initialState.form[key] !== undefined) {
                    values[key] = action[key];
                }
            }

            return {
                ...state,
                error: null,
                form: {
                    ...initialState.form,
                    ...values,
                    isDirty: false,
                }
            }
        }
        case SET_PROFILE_FORM_VALUE: {
            return {
                ...state,
                error: null,
                form: {
                    ...state.form,
                    [action.field]: action.value,
                    isDirty: true,
                }
            };
        }
        case PROFILE_ERROR: {
            return {
                ...state,
                error: action.code
            };
        }
        default: {
            return state;
        }
    }
}