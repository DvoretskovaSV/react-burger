import React from 'react';
import Link from '../elements/link';
import navStyles from './nav-bar.module.css';
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {logout} from "../../services/actions/user";
import {useDispatch} from "react-redux";

const descriptions = {
    '/profile': `В этом разделе вы можете \n изменить свои персональные данные`,
    '/profile/orders': 'Список заказов',
};

const NavBar = () => {
    const { path } = useRouteMatch();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout()).then(() => {
            history.replace('/login');
        });
    }

    return <div className={navStyles.wrap}>
        <nav className={`mb-15 ${navStyles.nav}`}>
            <Link
                text="Профиль"
                type="sub"
                exact={true}
                to={path}
                >
            </Link>
            <Link
                text="История заказов"
                type="sub"
                to={`${path}/orders`}
                >
            </Link>
            <Link
                text="Выход"
                type="sub"
                onClick={handleLogout}
                to={`/logout`}
                >
            </Link>
        </nav>
        <div className={navStyles.description}>
            {descriptions[pathname]}
        </div>
    </div>
};

export default NavBar;