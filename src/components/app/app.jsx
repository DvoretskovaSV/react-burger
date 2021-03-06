import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main-page/main';

const App = () => {

    return (
        <div className={styles.app}>
            <AppHeader />
            <Main />
        </div>
    )
};

export default App;