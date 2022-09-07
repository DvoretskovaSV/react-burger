import {ingredientsReducer} from './ingredients';
import {GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../actions/ingredients";
import {initialState} from "./ingredients";

const ingredients = [{_id: '123456', name: 'Bun 1'}];

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })


    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            ingredientsReducer({
                ...initialState
            }, {
                type: GET_INGREDIENTS_REQUEST,
            })
        ).toEqual({
            ...initialState,
            ingredients: [],
            loading: true
        })
    });

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            ingredientsReducer({
                ...initialState,
                fetchError: true,
            }, {
                type: GET_INGREDIENTS_SUCCESS,
                ingredients
            })
        ).toEqual({
            ...initialState,
            ingredients,
        })
    });

    it('should handle GET_INGREDIENTS_ERROR', () => {
        expect(
            ingredientsReducer({
                ...initialState,
                ingredients,
            }, {
                type: GET_INGREDIENTS_ERROR
            })
        ).toEqual({
            ...initialState,
            fetchError: true,
            ingredients: [],
        })
    });
});