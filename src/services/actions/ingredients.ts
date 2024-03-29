import {INGREDIENTS_URL} from "../../utils/constants";
import {checkResponse} from "../../utils/util";
import {AppThunk} from "../../hooks";
import {AppDispatch} from "../../index";
import {TIngredient, TMessages} from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';
export const CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER: 'CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER' = 'CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER';

export interface IGetIngredients {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_ERROR;
    readonly message: TMessages;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: Array<TIngredient>;
}

export type TIngredientsActions =
    | IGetIngredients
    | IGetIngredientsFailedAction
    | IGetIngredientsSuccessAction;

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
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