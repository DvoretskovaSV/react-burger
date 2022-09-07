import { modalReducer } from "./modal";
import {
    CLOSE_MODAL_INGREDIENT,
    CLOSE_MODAL_ORDER,
    OPEN_MODAL_INGREDIENT,
    OPEN_MODAL_ORDER,
    SHOW_MODAL_ORDER
} from "../actions/modal";
import {initialState} from "./modal";

const orderID = '123450';
const orderIDNew = '54321';

describe('modal reducer', () => {

    it('should return the initial state', () => {
        expect(modalReducer(undefined, {})).toEqual(initialState)
    });

    it('should handle OPEN_MODAL_ORDER', () => {
        expect(
            modalReducer({
                ...initialState,
                order: orderID,
                isOpenModalOrder: false
            }, {
                type: OPEN_MODAL_ORDER,
            })
        ).toEqual({
            ...initialState,
            order: orderID,
            isOpenModalOrder: true,
        })
    });

    it('should handle SHOW_MODAL_ORDER', () => {
        expect(
            modalReducer({
                ...initialState,
                order: orderID,
            }, {
                type: SHOW_MODAL_ORDER,
                order: orderIDNew,
            })
        ).toEqual({
            ...initialState,
            order: orderIDNew,
        })
    });

    it('should handle CLOSE_MODAL_ORDER', () => {
        expect(
            modalReducer({
                ...initialState,
                order: orderIDNew,
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
                id: orderID,
            })
        ).toEqual({
            ...initialState,
            isOpenIngredient: true,
            openIdIngredient: orderID
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
        ).toEqual(initialState)
    });
});