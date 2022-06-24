import {
    Logo,
    BurgerIcon,
    ProfileIcon,
    ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import headerStyles from './app-header.module.css';
import Link from '../elements/link';

const AppHeader = () =>
    (
        <header className={`${headerStyles.header} mb-10`}>
            <div className={headerStyles.content}>
                <div className={headerStyles.left}>
                    <Link text="Конструктор">
                        <BurgerIcon type="secondary"/>
                    </Link>
                    <Link text="Лента заказов">
                        <ListIcon type="secondary"/>
                    </Link>
                </div>
                <div className={headerStyles.middle}>
                    <Link>
                        <Logo className="p-1"/>
                    </Link>
                </div>
                <div className={headerStyles.right}>
                    <Link text="Личный кабинет">
                        <ProfileIcon type="secondary"/>
                    </Link>
                </div>
            </div>
        </header>
    );


export default AppHeader;