import { profileReducer } from "./profile";
import {PROFILE_ERROR, SET_DEFAULT_VALUES, SET_PROFILE_FORM_VALUE} from "../actions/profile";

const initialState = {
    form: {
        name: '',
        email: '',
        password: '',
        isDirty: false,
    },
    error: null,
}

describe('profile reducer', () => {

    it('should return the initial state', () => {
        expect(profileReducer(undefined, {})).toEqual({
            form: {
                name: '',
                email: '',
                password: '',
                isDirty: false,
            },
            error: null,
        })
    });

    it('should handle SET_DEFAULT_VALUES', () => {
        expect(
            profileReducer(initialState, {
                type: SET_DEFAULT_VALUES,
                name: 'name',
                email: 'name@email.com',
                password: 'puf',
            })
        ).toEqual({
            form: {
                name: 'name',
                email: 'name@email.com',
                password: 'puf',
                isDirty: false,
            },
            error: null,
        })
    });

    it('should handle SET_PROFILE_FORM_VALUE', () => {
        expect(
            profileReducer({
                form: {
                    name: 'name',
                    email: 'name@email.com',
                    password: 'puf',
                    isDirty: false,
                },
                error: null,
            }, {
                type: SET_PROFILE_FORM_VALUE,
                field: 'name',
                value: 'name_name'
            })
        ).toEqual({
            form: {
                name: 'name_name',
                email: 'name@email.com',
                password: 'puf',
                isDirty: true,
            },
            error: null,
        })
    });

    it('should handle PROFILE_ERROR', () => {
        expect(
            profileReducer({
                form: {
                    name: 'name_name',
                    email: 'name@email.com',
                    password: 'puf',
                    isDirty: true,
                },
                error: null,
            }, {
                type: PROFILE_ERROR,
                code: 401
            })
        ).toEqual({
            form: {
                name: 'name_name',
                email: 'name@email.com',
                password: 'puf',
                isDirty: true,
            },
            error: 401,
        })
    });
});