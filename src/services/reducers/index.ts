import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients";
import {constructorReducer} from "./constructor";
import {orderReducer} from "./order";
import {modalReducer} from "./modal";
import {userReducer} from "./user";
import {profileReducer} from "./profile";
import {WebSocketReducer} from "./ws";


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    order: orderReducer,
    modal: modalReducer,
    user: userReducer,
    profile: profileReducer,
    ws: WebSocketReducer,
});