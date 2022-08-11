import {CLOSE_MODAL_INGREDIENT, CLOSE_MODAL_ORDER, OPEN_MODAL_INGREDIENT, OPEN_MODAL_ORDER} from "../actions/modal";
import {AnyAction} from "redux";
import {TOrder} from "../../utils/types";

interface IState {
    isOpenModalOrder: boolean;
    isOpenModalIngredient: boolean;
    openIdIngredient: string | null;
    order: TOrder | null;
    isOpenIngredient: boolean;
}

const initialState: IState = {
    isOpenModalOrder: false,
    isOpenModalIngredient: false,
    openIdIngredient: null,
    isOpenIngredient: false,
    order: null,
};

export const modalReducer = (state = initialState, action: AnyAction) : IState => {
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