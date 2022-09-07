import {constructorReducer} from './constructor';
import uuid from "react-uuid"
import {
    REMOVE_CONSTRUCTOR_INGREDIENTS,
    RESET_CONSTRUCTOR,
    SET_CONSTRUCTOR_INGREDIENTS,
    SET_CONSTRUCTOR_LOCK
} from "../actions/constructor";
import {CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER} from "../actions/ingredients";
import {initialState} from "./constructor";

const ingredients = [
    {id: '12345', uuid: uuid()},
    {id: '54321', uuid: uuid()},
    {id: '54789', uuid: uuid()},
    {id: '98765', uuid: uuid()}
];


describe('constructor reducer', () => {

    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    });

    it('should handle SET_CONSTRUCTOR_INGREDIENTS', () => {
        expect(
            constructorReducer({
                ...initialState,
                ingredients: [ingredients[0]]
            }, {
                type: SET_CONSTRUCTOR_INGREDIENTS,
                id: ingredients[1].id,
                uuid: ingredients[1].uuid,
            })
        ).toEqual({
            ...initialState,
            ingredients: [ingredients[0], ingredients[1]],
        })
    });

    it('should handle REMOVE_CONSTRUCTOR_INGREDIENTS', () => {
        expect(
            constructorReducer({
                ...initialState,
                ingredients: [ingredients[0], ingredients[1]],
            }, {
                type: REMOVE_CONSTRUCTOR_INGREDIENTS,
                uuid: ingredients[0].uuid,
            })
        ).toEqual({
            ...initialState,
            ingredients: [ingredients[1]],
        })
    });

    it('should handle CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER', () => {
        expect(
            constructorReducer({
                ...initialState,
                ingredients: [ingredients[0], ingredients[1], ingredients[2], ingredients[3]],
            }, {
                type: CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
                prevIndex: 0,
                currentIndex: 2,
            })
        ).toEqual({
            ...initialState,
            ingredients: [ingredients[2], ingredients[1], ingredients[0], ingredients[3]],
        })
    });

    it('should handle RESET_CONSTRUCTOR', () => {
        expect(
            constructorReducer({
                lock: ingredients[ingredients.length - 1].id,
                ingredients,
            }, {
                type: RESET_CONSTRUCTOR,
            })
        ).toEqual(initialState)
    });

    it('should handle SET_CONSTRUCTOR_LOCK', () => {
        expect(
            constructorReducer(initialState, {
                type: SET_CONSTRUCTOR_LOCK,
                id: ingredients[0].id,
            })
        ).toEqual({
            ingredients: [],
            lock: ingredients[0].id,
        });

        expect(
            constructorReducer({
                lock: ingredients[ingredients.length - 1].id,
                ingredients,
            }, {
                type: SET_CONSTRUCTOR_LOCK,
                id: ingredients[0].id,
            })
        ).toEqual({
            lock: ingredients[0].id,
            ingredients,
        })
    });
});