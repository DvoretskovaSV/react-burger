import {MAKE_ORDER_URL} from "../../utils/constants";
import {OPEN_MODAL_ORDER} from "./modal";
import {RESET_CONSTRUCTOR} from "./constructor";
import {checkResponse} from "../../utils/util";

export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_ERROR';

export const createOrder = () => (dispatch, getState) => {
    const {ingredients} = getState().constructorIngredients;
    if (!ingredients.length) return;

    dispatch({
        type: CREATE_ORDER_REQUEST
    });

    const lockId = getState().constructorIngredients.lock;

    fetch(MAKE_ORDER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            ingredients: [...ingredients.map(item => item.id), lockId]
        })
    }).then(checkResponse).then(data => {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                number: data.order.number,
                name: data.name
            });

            dispatch({
                type: OPEN_MODAL_ORDER
            });

            dispatch({
                type: RESET_CONSTRUCTOR
            })
        })
        .catch(err => {
            dispatch({
                type: CREATE_ORDER_ERROR,
                message: err.message
            });
        });
    ;
};