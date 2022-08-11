import {INGREDIENTS_URL} from "../../utils/constants";
import {checkResponse} from "../../utils/util";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER = 'CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER';


export const getIngredients = () => (dispatch: any) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    });

    fetch(INGREDIENTS_URL).then(checkResponse)
        .then(data => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: data.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_INGREDIENTS_ERROR,
                message: err.message
            });
        });
}