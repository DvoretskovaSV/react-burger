import {MAKE_ORDER_URL} from "../../utils/constants";
import {OPEN_MODAL_ORDER, SHOW_MODAL_ORDER} from "./modal";
import {resetConstructor} from "./constructor";
import {checkResponse, getCookie} from "../../utils/util";
import {TConstructorIngredient} from "../../utils/types";
import {AppDispatch, RootState} from "../../index";
import {AppThunk} from "../../hooks";

export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR: 'CREATE_ORDER_ERROR' = 'CREATE_ORDER_ERROR';
export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';

interface ICreateOrderRequest {
    readonly type: typeof CREATE_ORDER_REQUEST;
}

interface ICreateOrderSuccess {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    number: string;
    name: string;
}

interface ICreateOrderError {
    readonly type: typeof CREATE_ORDER_ERROR;
}

export type TOrderActions = ICreateOrderRequest | ICreateOrderSuccess | ICreateOrderError;

export const createOrder: AppThunk = () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {ingredients} = getState().constructorIngredients;
    if (!ingredients.length) return;

    dispatch({
        type: CREATE_ORDER_REQUEST
    });

    dispatch({
        type: OPEN_MODAL_ORDER
    });

    const lockId = getState().constructorIngredients.lock;

    fetch(MAKE_ORDER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token'),
        },
        body: JSON.stringify({
            ingredients: [...ingredients.map((item: TConstructorIngredient) => item.id), lockId]
        })
    }).then(checkResponse).then(data => {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                number: data.order.number,
                name: data.name
            });

            if (getState().modal.isOpenModalOrder) {
                dispatch({
                    type: SHOW_MODAL_ORDER,
                    order: {
                        number: data.order.number,
                        name: data.name
                    },
                });
            }

            dispatch(resetConstructor());
        })
        .catch(err => {
            dispatch({
                type: CREATE_ORDER_ERROR,
                message: err.message
            });
        });
};