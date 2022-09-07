import { orderReducer } from "./order";
import {CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from "../actions/order";
import {initialState} from "./order";

const order = {
    number: '12345',
    name: 'order 1'
};

describe('order reducer', () => {

    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    });

    it('should handle CREATE_ORDER_REQUEST', () => {
        expect(
            orderReducer(initialState, {
                type: CREATE_ORDER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            loading: true,
        })
    });

    it('should handle CREATE_ORDER_SUCCESS', () => {
        expect(
            orderReducer(initialState, {
                type: CREATE_ORDER_SUCCESS,
                ...order
            })
        ).toEqual({
            ...initialState,
            order,
        })
    });

    it('should handle CREATE_ORDER_ERROR', () => {
        expect(
            orderReducer(initialState, {
                type: CREATE_ORDER_ERROR,
            })
        ).toEqual({
            ...initialState,
            fetchError: true,
        })
    });
});