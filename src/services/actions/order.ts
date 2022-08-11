import {MAKE_ORDER_URL} from "../../utils/constants";
import {OPEN_MODAL_ORDER} from "./modal";
import {RESET_CONSTRUCTOR} from "./constructor";
import {checkResponse, getCookie} from "../../utils/util";
import {TConstructorIngredient} from "../../utils/types";

export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_ERROR';

export const createOrder = () => (dispatch: any, getState: any) => {
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