import { modalReducer } from "./modal";
import {
    CLOSE_MODAL_INGREDIENT,
    CLOSE_MODAL_ORDER,
    OPEN_MODAL_INGREDIENT,
    OPEN_MODAL_ORDER,
    SHOW_MODAL_ORDER
} from "../actions/modal";

const initialState = {
    isOpenModalOrder: false,
    isOpenModalIngredient: false,
    openIdIngredient: null,
    isOpenIngredient: false,
    order: null,
};

describe('modal reducer', () => {

    it('should return the initial state', () => {
        expect(modalReducer(undefined, {})).toEqual({
            isOpenModalOrder: false,
            isOpenModalIngredient: false,
            openIdIngredient: null,
            isOpenIngredient: false,
            order: null,
        })
    });

    it('should handle OPEN_MODAL_ORDER', () => {
        expect(
            modalReducer({
                ...initialState,
                order: '123450',
                isOpenModalOrder: false
            }, {
                type: OPEN_MODAL_ORDER,
            })
        ).toEqual({
            ...initialState,
            order: '123450',
            isOpenModalOrder: true,
        })
    });

    it('should handle SHOW_MODAL_ORDER', () => {
        expect(
            modalReducer({
                ...initialState,
                order: '12345',
            }, {
                type: SHOW_MODAL_ORDER,
                order: '54321',
            })
        ).toEqual({
            ...initialState,
            order: '54321',
        })
    });

    it('should handle CLOSE_MODAL_ORDER', () => {
        expect(
            modalReducer({
                ...initialState,
                order: '54321',
                isOpenModalOrder: true,
            }, {
                type: CLOSE_MODAL_ORDER,
            })
        ).toEqual({
            ...initialState,
            isOpenModalOrder: false,
        })
    });

    it('should handle OPEN_MODAL_INGREDIENT', () => {
        expect(
            modalReducer(initialState, {
                type: OPEN_MODAL_INGREDIENT,
                id: '12345'
            })
        ).toEqual({
            ...initialState,
            isOpenIngredient: true,
            openIdIngredient: '12345'
        })
    });

    it('should handle CLOSE_MODAL_INGREDIENT', () => {
        expect(
            modalReducer({
                ...initialState,
                isOpenModalIngredient: true
            }, {
                type: CLOSE_MODAL_INGREDIENT,
            })
        ).toEqual({
            ...initialState,
            isOpenModalOrder: false,
        })
    });
});