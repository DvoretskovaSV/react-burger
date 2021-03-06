import React from 'react';
import stylesLoader from './loader.module.css';

const Loader = () => {
    return (
        <div className={stylesLoader.loader}>
            <img src={require('../../images/loader.svg').default}/>
        </div>
    );
}

export default Loader;