// @ts-ignore
import uuid from "react-uuid"
import {CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER} from "./ingredients";

export const REMOVE_CONSTRUCTOR_INGREDIENTS: 'REMOVE_CONSTRUCTOR_INGREDIENTS' = 'REMOVE_CONSTRUCTOR_INGREDIENTS';
export const SET_CONSTRUCTOR_INGREDIENTS: 'SET_CONSTRUCTOR_INGREDIENTS' = 'SET_CONSTRUCTOR_INGREDIENTS';
export const SET_CONSTRUCTOR_LOCK: 'SET_CONSTRUCTOR_LOCK' = 'SET_CONSTRUCTOR_LOCK';
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';

interface IAddIngredient {
    readonly type: typeof SET_CONSTRUCTOR_INGREDIENTS;
    readonly id: string;
    readonly uuid: string;
}

interface IRemoveIngredient {
    readonly type: typeof REMOVE_CONSTRUCTOR_INGREDIENTS;
    readonly uuid: string;
}

interface IAddLock {
    readonly type: typeof SET_CONSTRUCTOR_LOCK;
    readonly id: string;
}

interface IChangeOrder {
    readonly type: typeof CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER;
    prevIndex: number;
    currentIndex: number;
}

interface IResetConstructor {
    readonly type: typeof RESET_CONSTRUCTOR;
}

export type TConstructorActions =
    IAddIngredient
    | IRemoveIngredient
    | IAddLock
    | IChangeOrder
    | IResetConstructor;


export const addIngredient = (id: string) : IAddIngredient => {
    return {
        type: SET_CONSTRUCTOR_INGREDIENTS,
        id: id,
        uuid: uuid()
    };
};

export const removeIngredient = (uuid: string) : IRemoveIngredient => {
    return {
        type: REMOVE_CONSTRUCTOR_INGREDIENTS,
        uuid
    };
};

export const addLock = (id: string) : IAddLock => {
    return {
        type: SET_CONSTRUCTOR_LOCK,
        id
    };
};

export const changeOrder = (dragIndex: number, hoverIndex: number) : IChangeOrder => {
    return {
        type: CHANGE_CONSTRUCTOR_INGREDIENTS_ORDER,
        prevIndex: dragIndex,
        currentIndex: hoverIndex,
    };
}

export const resetConstructor = () : IResetConstructor => {
    return {
        type: RESET_CONSTRUCTOR
    };
}