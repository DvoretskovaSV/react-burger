import { orderReducer } from "./order";
import {CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from "../actions/order";

const initialState = {
    order: null,
    loading: false,
    fetchError: false,
};

describe('order reducer', () => {

    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual({
            order: null,
            loading: false,
            fetchError: false,
        })
    });

    it('should handle CREATE_ORDER_REQUEST', () => {
        expect(
            orderReducer({
                ...initialState
            }, {
                type: CREATE_ORDER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            loading: true,
        })
    });

    it('should handle CREATE_ORDER_SUCCESS', () => {
        expect(
            orderReducer({
                ...initialState,
            }, {
                type: CREATE_ORDER_SUCCESS,
                number: '12345',
                name: 'order 1'
            })
        ).toEqual({
            order: {
                number: '12345',
                name: 'order 1',
            },
            fetchError: false,
            loading: false
        })
    });

    it('should handle CREATE_ORDER_ERROR', () => {
        expect(
            orderReducer({
                order: {
                    number: '12345',
                    name: 'order 1',
                },
                fetchError: false,
                loading: true
            }, {
                type: CREATE_ORDER_ERROR,
            })
        ).toEqual({
            ...initialState,
            fetchError: true,
            loading: false
        })
    });
});