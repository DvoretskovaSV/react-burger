import {
    CLOSE_MODAL_INGREDIENT,
    CLOSE_MODAL_ORDER,
    OPEN_MODAL_INGREDIENT,
    OPEN_MODAL_ORDER,
    SHOW_MODAL_ORDER,
    TModalActions
} from "../actions/modal";
import {TOrder} from "../../utils/types";

interface IState {
    isOpenModalOrder: boolean;
    isOpenModalIngredient: boolean;
    openIdIngredient: string | null;
    order: TOrder | null;
    isOpenIngredient: boolean;
}

export const initialState: IState = {
    isOpenModalOrder: false,
    isOpenModalIngredient: false,
    openIdIngredient: null,
    isOpenIngredient: false,
    order: null,
};

export const modalReducer = (state = initialState, action: TModalActions) : IState => {
    switch (action.type) {
        case OPEN_MODAL_ORDER:
            return {
                ...state,
                isOpenModalOrder: true,
            };
        case SHOW_MODAL_ORDER:
            return {
                ...state,
                order: action.order,
            };
        case CLOSE_MODAL_ORDER:
            return {
                ...state,
                isOpenModalOrder: false,
                order: initialState.order
            };
        case OPEN_MODAL_INGREDIENT:
            return {
                ...state,
                isOpenIngredient: true,
                openIdIngredient: action.id
            };
        case CLOSE_MODAL_INGREDIENT:
            return {
                ...state,
                isOpenModalIngredient: false
            };
        default: {
            return state;
        }
    }
};