import {constructorReducer} from './constructor';
import {
    REMOVE_CONSTRUCTOR_INGREDIENTS,
    RESET_CONSTRUCTOR,
    SET_CONSTRUCTOR_INGREDIENTS,
    SET_CONSTRUCTOR_LOCK
} from "../actions/constructor";
import {CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER} from "../actions/ingredients";

const initialState = {
    ingredients: [],
    lock: null,
};

describe('constructor reducer', () => {

    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual({
            ingredients: [],
            lock: null,
        })
    });

    it('should handle SET_CONSTRUCTOR_INGREDIENTS', () => {
        expect(
            constructorReducer({
                ...initialState,
                ingredients: [{id: '12345', uuid: '12345'}]
            }, {
                type: SET_CONSTRUCTOR_INGREDIENTS,
                id: '54321',
                uuid: '54321',
            })
        ).toEqual({
            ingredients: [{id: '12345', uuid: '12345'}, {id: '54321', uuid: '54321'}],
            lock: null,
        })
    });

    it('should handle REMOVE_CONSTRUCTOR_INGREDIENTS', () => {
        expect(
            constructorReducer({
                ...initialState,
                ingredients: [{id: '12345', uuid: '12345'}, {id: '54321', uuid: '54321'}],
            }, {
                type: REMOVE_CONSTRUCTOR_INGREDIENTS,
                uuid: '12345',
            })
        ).toEqual({
            ingredients: [{id: '54321', uuid: '54321'}],
            lock: null,
        })
    });

    it('should handle CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER', () => {
        expect(
            constructorReducer({
                ...initialState,
                ingredients: [{id: '12345', uuid: '12345'}, {id: '54321', uuid: '12345'}, {id: '54789', uuid: '54789'}, {id: '98765', uuid: '98765'}],
            }, {
                type: CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
                prevIndex: 0,
                currentIndex: 2,
            })
        ).toEqual({
            ingredients: [{id: '54789', uuid: '54789'}, {id: '54321', uuid: '12345'}, {id: '12345', uuid: '12345'}, {id: '98765', uuid: '98765'}],
            lock: null,
        })
    });

    it('should handle RESET_CONSTRUCTOR', () => {
        expect(
            constructorReducer({
                lock: '98765',
                ingredients: [{id: '12345', uuid: '12345'}, {id: '54321', uuid: '12345'}, {id: '54789', uuid: '54789'}, {id: '98765', uuid: '98765'}],
            }, {
                type: RESET_CONSTRUCTOR,
            })
        ).toEqual(initialState)
    });

    it('should handle SET_CONSTRUCTOR_LOCK', () => {
        expect(
            constructorReducer(initialState, {
                type: SET_CONSTRUCTOR_LOCK,
                id: '12345'
            })
        ).toEqual({
            ingredients: [],
            lock: '12345'
        });

        expect(
            constructorReducer({
                lock: '98765',
                ingredients: [{id: '12345', uuid: '12345'}, {id: '54321', uuid: '12345'}, {id: '54789', uuid: '54789'}, {id: '98765', uuid: '98765'}],
            }, {
                type: SET_CONSTRUCTOR_LOCK,
                id: '12345'
            })
        ).toEqual({
            lock: '12345',
            ingredients: [{id: '12345', uuid: '12345'}, {id: '54321', uuid: '12345'}, {id: '54789', uuid: '54789'}, {id: '98765', uuid: '98765'}],
        })
    });
});