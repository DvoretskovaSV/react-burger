import {CLOSE_MODAL_INGREDIENT, CLOSE_MODAL_ORDER, OPEN_MODAL_INGREDIENT, OPEN_MODAL_ORDER} from "../actions/modal";

const initialState = {
    isOpenModalOrder: false,
    isOpenModalIngredient: false,
    openIdIngredient: null,
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL_ORDER:
            return {
                ...state,
                isOpenModalOrder: true
            };
        case CLOSE_MODAL_ORDER:
            return {
                ...state,
                isOpenModalOrder: false
            };
        case OPEN_MODAL_INGREDIENT:
            return {
                isOpenIngredient: true,
                openIdIngredient: action.id
            };
        case CLOSE_MODAL_INGREDIENT:
            return {
                isOpenModalIngredient: false
            };
        default: {
            return state;
        }
    }
};