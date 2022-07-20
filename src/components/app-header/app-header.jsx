import {
    Logo,
    BurgerIcon,
    ProfileIcon,
    ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import headerStyles from './app-header.module.css';
import {Link as RouteLink} from "react-router-dom";
import Link from '../elements/link';

const AppHeader = () =>
    (
        <header className={`${headerStyles.header} mb-10`}>
            <div className={headerStyles.content}>
                <div className={headerStyles.left}>
                    <Link text="Конструктор" to="/" exact={true}>
                        <BurgerIcon type="secondary"/>
                    </Link>
                    <Link text="Лента заказов" to="/profile/orders">
                        <ListIcon type="secondary"/>
                    </Link>
                </div>
                <div className={headerStyles.middle}>
                    <RouteLink to="/">
                        <Logo className="p-1"/>
                    </RouteLink>
                </div>
                <div className={headerStyles.right} >
                    <Link text="Личный кабинет" to="/profile" exact={true}>
                        <ProfileIcon type="secondary"/>
                    </Link>
                </div>
            </div>
        </header>
    );


export default AppHeader;