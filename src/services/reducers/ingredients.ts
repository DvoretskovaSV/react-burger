import {
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    TIngredientsActions
} from "../actions/ingredients";
import {TIngredient} from "../../utils/types";

interface IState<T = TIngredient> {
    ingredients: Array<T>;
    loading: boolean;
    fetchError: boolean | string;
}

const initialState: Readonly<IState> = {
    ingredients: [],
    loading: false,
    fetchError: false,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): IState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                fetchError: false,
                ingredients: action.ingredients,
                loading: false
            };
        }
        case GET_INGREDIENTS_ERROR: {
            return {
                ...initialState,
                fetchError: true,
                loading: false
            };
        }
        default: {
            return state;
        }
    }
};
