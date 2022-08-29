import {useDispatch, useSelector} from 'react-redux'
import type { RootState, AppDispatch } from '../index';
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {TIngredientsActions} from "../services/actions/ingredients";
import {TConstructorActions} from "../services/actions/constructor";
import {TModalActions} from "../services/actions/modal";
import {TOrderActions} from "../services/actions/order";
import {TProfileActions} from "../services/actions/profile";
import {TUserActions} from "../services/actions/user";
import {TWebSocketActions} from "../services/actions/ws";


export type TApplicationActions =
    TConstructorActions
    | TIngredientsActions
    | TModalActions
    | TOrderActions
    | TProfileActions
    | TUserActions
    | TWebSocketActions;

export const useAppDispatch: () => (AppDispatch | AppThunk) = useDispatch;
export const useAppSelector = <T>(func: (state: RootState) => T): T => useSelector(func);
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, never, TApplicationActions>>;
