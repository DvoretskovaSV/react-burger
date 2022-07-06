import {INGREDIENTS_URL} from "../../utils/constants";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER = 'CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER';


export const getIngredients = () => (dispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    });

    fetch(INGREDIENTS_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(response);
            }

            return response.json()
        })
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