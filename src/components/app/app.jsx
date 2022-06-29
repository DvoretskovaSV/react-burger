import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main-page/main';
import {INGREDIENTS_URL} from "../../utils/constants";

const App = () => {

    const [loading, setLoading] = useState(true);
    const [ingredients, setIngredients] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(INGREDIENTS_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response);
                }

                return response.json()
            })
            .then(data => setIngredients(data.data))
            .catch(err => setFetchError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader />
            <Main ingredients={ingredients} loading={loading} fetchError={fetchError}/>
        </div>
    )
};

export default App;