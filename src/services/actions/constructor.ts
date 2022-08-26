// @ts-ignore
import uuid from "react-uuid"
import {CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER} from "./ingredients";
import {AnyAction} from "redux";

export const REMOVE_CONSTRUCTOR_INGREDIENTS = 'REMOVE_CONSTRUCTOR_INGREDIENTS';
export const SET_CONSTRUCTOR_INGREDIENTS = 'SET_CONSTRUCTOR_INGREDIENTS';
export const SET_CONSTRUCTOR_LOCK = 'SET_CONSTRUCTOR_LOCK';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';


export const addIngredient = (id: string) : AnyAction => {
    return {
        type: SET_CONSTRUCTOR_INGREDIENTS,
        id: id,
        uuid: uuid()
    };
};

export const removeIngredient = (uuid: string) : AnyAction => {
    return {
        type: REMOVE_CONSTRUCTOR_INGREDIENTS,
        uuid
    };
};

export const addLock = (id: string) : AnyAction => {
    return {
        type: SET_CONSTRUCTOR_LOCK,
        id
    };
};

export const changeOrder = (dragIndex: number, hoverIndex: number) : AnyAction => {
    return {
        type: CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
        prevIndex: dragIndex,
        currentIndex: hoverIndex,
    };
}