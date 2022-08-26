import React, {FC, useEffect} from 'react';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import {ForgotPasswordPage, LoginPage, MainPage, NotFound404, RegisterPage, ResetPasswordPage} from "../../pages/";
import ProtectedRoute from "../protected-route";
import {authenticate} from "../../services/actions/user";
import ProtectedRouteNoAuth from "../protected-route-no-auth";
import ProfilePage from "../../pages/profile";
import IngredientPage from "../../pages/ingredient-page";
import Modal from "../elements/modal/modal";
import {Location} from "history";
import {useAppDispatch} from "../../hooks";
import OrdersPage from "../../pages/orders-page";
import OrderPage from "../../pages/order-page";
import UserOrderPage from "../../pages/user-order-page";
import {getIngredients} from "../../services/actions/ingredients";

type stateType = {
    background?: stateType;
    number?: number;
} & Location;

const App: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation<stateType>();
    const history = useHistory();

    const background = location.state && location.state.background;

    const init = () => {
        dispatch(authenticate());
    };

    useEffect(() => {
        init();
        dispatch(getIngredients());
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader/>
            <div className={styles.wrap}>
                <Switch location={background || location}>
                    <Route path="/" exact={true}>
                        <MainPage/>
                    </Route>

                    <Route path="/feed" exact={true}>
                        <OrdersPage/>
                    </Route>

                    <ProtectedRouteNoAuth path="/register" exact={true}>
                        <RegisterPage/>
                    </ProtectedRouteNoAuth>

                    <ProtectedRouteNoAuth path="/login" exact={true}>
                        <LoginPage/>
                    </ProtectedRouteNoAuth>

                    <ProtectedRouteNoAuth path="/forgot-password" exact={true}>
                        <ForgotPasswordPage/>
                    </ProtectedRouteNoAuth>

                    <ProtectedRouteNoAuth path="/reset-password" exact={true}>
                        <ResetPasswordPage/>
                    </ProtectedRouteNoAuth>

                    <Route path='/ingredients/:ingredientId' exact={true}>
                        <IngredientPage/>
                    </Route>

                    <Route path='/feed/:id' exact={true}>
                        <OrderPage/>
                    </Route>

                    <ProtectedRoute path='/profile/orders/:id' exact={true}>
                        <UserOrderPage/>
                    </ProtectedRoute>

                    <ProtectedRoute path="/profile">
                        <ProfilePage/>
                    </ProtectedRoute>

                    <Route>
                        <NotFound404/>
                    </Route>
                </Switch>
                {background && (
                    <>
                        <Route path='/ingredients/:ingredientId'>
                            <Modal
                                onClose={() => history.goBack()}
                                title="Детали ингредиента"
                                contentClassName="pb-15 pr-25 pl-25"
                            >
                                <IngredientPage/>
                            </Modal>
                        </Route>
                        <Route path='/feed/:id'>
                            <Modal
                                onClose={() => history.goBack()}
                                title={
                                    <div className="text text_type_digits-default">#{location.state?.number}</div>
                                }
                                contentClassName="pb-10 pr-10 pl-10"
                            >
                                <OrderPage/>
                            </Modal>
                        </Route>
                        <ProtectedRoute path='/profile/orders/:id'>
                            <Modal
                                onClose={() => history.goBack()}
                                title={
                                    <div className="text text_type_digits-default">#{location.state?.number}</div>
                                }
                                contentClassName="pb-10 pr-10 pl-10"
                            >
                                <UserOrderPage/>
                            </Modal>
                        </ProtectedRoute>
                    </>
                )}
            </div>
        </div>
    )
};

export default App;