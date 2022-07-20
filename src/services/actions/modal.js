export const OPEN_MODAL_ORDER = 'OPEN_MODAL_ORDER';
export const CLOSE_MODAL_ORDER = 'CLOSE_MODAL_ORDER';

export const OPEN_MODAL_INGREDIENT = 'OPEN_MODAL_INGREDIENT';
export const CLOSE_MODAL_INGREDIENT = 'CLOSE_MODAL_INGREDIENT';

export const openModalIngredient = (id) => {
    return {
        type: OPEN_MODAL_INGREDIENT,
        id
    };
};

export const closeModalIngredient = () => {
    return {
        type: CLOSE_MODAL_INGREDIENT
    };
};

export const closeModalOrder = () => {
    return {
        type: CLOSE_MODAL_ORDER
    };
};