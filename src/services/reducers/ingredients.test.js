import {ingredientsReducer} from './ingredients';
import {GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../actions/ingredients";

const initialState = {
    ingredients: [],
    loading: false,
    fetchError: false,
}

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual({
            ingredients: [],
            loading: false,
            fetchError: false,
        })
    })


    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            ingredientsReducer({
                ...initialState
            }, {
                type: GET_INGREDIENTS_REQUEST,
            })
        ).toEqual({
            fetchError: false,
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
                ingredients: [{_id: '123456', name: 'Bun 1'}]
            })
        ).toEqual({
            fetchError: false,
            ingredients: [{_id: '123456', name: 'Bun 1'}],
            loading: false
        })
    });

    it('should handle GET_INGREDIENTS_ERROR', () => {
        expect(
            ingredientsReducer({
                fetchError: false,
                ingredients: [{_id: '123456', name: 'Bun 1'}],
                loading: false
            }, {
                type: GET_INGREDIENTS_ERROR
            })
        ).toEqual({
            fetchError: true,
            ingredients: [],
            loading: false
        })
    });
});