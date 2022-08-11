import React, {useEffect} from 'react';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import {ForgotPasswordPage, LoginPage, MainPage, NotFound404, RegisterPage, ResetPasswordPage} from "../../pages/";
import ProtectedRoute from "../protected-route";
import {useDispatch} from "react-redux";
import {authenticate} from "../../services/actions/user";
import ProtectedRouteNoAuth from "../protected-route-no-auth";
import ProfilePage from "../../pages/profile";
import IngredientPage from "../../pages/ingredient-page";
import Modal from "../elements/modal/modal";


const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const background = location.state && location.state.background;

    const init = () => {
        dispatch(authenticate());
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader/>
            <div className={styles.wrap}>
                <Switch location={background || location}>
                    <Route path="/" exact={true}>
                        <MainPage/>
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

                    <ProtectedRoute path="/profile">
                        <ProfilePage/>
                    </ProtectedRoute>

                    <Route path='/ingredients/:ingredientId' exact={true}>
                        <IngredientPage />
                    </Route>

                    <Route>
                        <NotFound404/>
                    </Route>
                </Switch>
                {background && (
                    <Route path='/ingredients/:ingredientId'>
                        <Modal
                            onClose={() => history.goBack()}
                            title="Детали ингредиента"
                        >
                            <IngredientPage />
                        </Modal>
                    </Route>
                )}
            </div>
        </div>
    )
};

export default App;