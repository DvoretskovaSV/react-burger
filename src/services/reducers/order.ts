import {CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from "../actions/order";
import {AnyAction} from "redux";

interface IState {
    order: string | null;
    loading: boolean;
    fetchError: boolean;
}

const initialState: IState = {
    order: null,
    loading: false,
    fetchError: false,
};

export const orderReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case CREATE_ORDER_SUCCESS: {
            return {
                ...state,
                order: {
                    number: action.number,
                    name: action.name,
                },
                fetchError: false,
                loading: false
            };
        }
        case CREATE_ORDER_ERROR: {
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
