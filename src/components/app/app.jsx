import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main-page/main';
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";

const App = () => {
    const dispatch = useDispatch();

    const loading = useSelector(store => store.ingredients.isLoading);
    const fetchError = useSelector(store => store.ingredients.fetchError);
    const ingredients = useSelector(store => store.ingredients.ingredients);

    useEffect(() => {
        dispatch(getIngredients());
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader />
            <Main ingredients={ingredients} loading={loading} fetchError={fetchError}/>
        </div>
    )
};

export default App;