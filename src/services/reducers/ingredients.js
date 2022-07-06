import {GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../actions/ingredients";

const initialState = {
    ingredients: [],
    loading: false,
    fetchError: false,
};

export const ingredientsReducer = (state = initialState, action) => {
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
