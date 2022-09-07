import { profileReducer } from "./profile";
import {PROFILE_ERROR, SET_DEFAULT_VALUES, SET_PROFILE_FORM_VALUE} from "../actions/profile";
import {initialState} from "./profile";

const email = 'name@email.com';
const password = 'puf';
const name = 'name';
const profileError = 401;

const newName = 'name_name';

describe('profile reducer', () => {

    it('should return the initial state', () => {
        expect(profileReducer(undefined, {})).toEqual(initialState)
    });

    it('should handle SET_DEFAULT_VALUES', () => {
        expect(
            profileReducer(initialState, {
                type: SET_DEFAULT_VALUES,
                name,
                email,
                password,
            })
        ).toEqual({
            ...initialState,
            form: {
                ...initialState.form,
                name,
                email,
                password,
            },
        })
    });

    it('should handle SET_PROFILE_FORM_VALUE', () => {
        expect(
            profileReducer({
                ...initialState,
                form: {
                    ...initialState.form,
                    name,
                    email,
                    password,
                },
            }, {
                type: SET_PROFILE_FORM_VALUE,
                field: 'name',
                value: newName
            })
        ).toEqual({
            ...initialState,
            form: {
                ...initialState.form,
                name: newName,
                email,
                password,
                isDirty: true,
            },
        })
    });

    it('should handle PROFILE_ERROR', () => {
        expect(
            profileReducer({
                ...initialState,
                form: {
                    ...initialState.form,
                    name: newName,
                    email,
                    password,
                    isDirty: true,
                },
                error: null,
            }, {
                type: PROFILE_ERROR,
                code: profileError
            })
        ).toEqual({
            ...initialState,
            form: {
                name: newName,
                email,
                password,
                isDirty: true,
            },
            error: profileError,
        })
    });
});