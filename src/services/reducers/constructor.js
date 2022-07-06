import {
    REMOVE_CONSTRUCTOR_INGREDIENTS, RESET_CONSTRUCTOR,
    SET_CONSTRUCTOR_INGREDIENTS,
    SET_CONSTRUCTOR_LOCK
} from "../actions/constructor";
import {CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER} from "../actions/ingredients";
import uuid from "react-uuid";

const initialState = {
    ingredients: [],
    lock: null,
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONSTRUCTOR_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    {
                        id: action.id,
                        uuid: uuid(),
                    }
                ]
            };
        case REMOVE_CONSTRUCTOR_INGREDIENTS:
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.uuid !== action.uuid)
            };
        case SET_CONSTRUCTOR_LOCK:
            return {
                ...state,
                lock: action.id,
            };
        case CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER:
            const ingredients = [...state.ingredients];
            const { prevIndex, currentIndex } = action;

            [ingredients[prevIndex], ingredients[currentIndex]] =
                [ingredients[currentIndex], ingredients[prevIndex]]

            return {
                ...state,
                ingredients: ingredients
            }
        case RESET_CONSTRUCTOR: {
            return {
                ...state,
                ingredients: initialState.ingredients,
                lock: initialState.lock
            }
        }
        default: {
            return state;
        }
    }
};
