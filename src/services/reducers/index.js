import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients";
import {constructorReducer} from "./constructor";
import {orderReducer} from "./order";
import {modalReducer} from "./modal";


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    order: orderReducer,
    modal: modalReducer
});