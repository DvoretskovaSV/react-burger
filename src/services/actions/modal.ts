import {TOrder} from "../../utils/types";

export const OPEN_MODAL_ORDER: 'OPEN_MODAL_ORDER' = 'OPEN_MODAL_ORDER';
export const CLOSE_MODAL_ORDER: 'CLOSE_MODAL_ORDER' = 'CLOSE_MODAL_ORDER';

export const OPEN_MODAL_INGREDIENT: 'OPEN_MODAL_INGREDIENT' = 'OPEN_MODAL_INGREDIENT';
export const CLOSE_MODAL_INGREDIENT: 'CLOSE_MODAL_INGREDIENT' = 'CLOSE_MODAL_INGREDIENT';
export const SHOW_MODAL_ORDER: 'SHOW_MODAL_ORDER' = 'SHOW_MODAL_ORDER';

interface IOpenModalIngredient {
    readonly type: typeof OPEN_MODAL_INGREDIENT;
    id: string
}

interface IShowModalOrder {
    order: TOrder | null;
    readonly type: typeof  SHOW_MODAL_ORDER
}

interface ICloseModalIngredient {
    readonly type: typeof CLOSE_MODAL_INGREDIENT;
}

interface ICloseModalOrder {
    readonly type: typeof CLOSE_MODAL_ORDER;
}

interface IOpenModalOrder {
    readonly type: typeof OPEN_MODAL_ORDER;
}

export type TModalActions =
    IOpenModalIngredient
    | ICloseModalIngredient
    | ICloseModalOrder
    | IOpenModalOrder
    | IShowModalOrder;

export const openModalIngredient = (id: string) : IOpenModalIngredient => {
    return {
        type: OPEN_MODAL_INGREDIENT,
        id
    };
};

export const closeModalIngredient = () : ICloseModalIngredient => {
    return {
        type: CLOSE_MODAL_INGREDIENT
    };
};

export const closeModalOrder = () : ICloseModalOrder => {
    return {
        type: CLOSE_MODAL_ORDER
    };
};