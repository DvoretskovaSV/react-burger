import React, {FC} from 'react';
import Link from '../elements/link';
import navStyles from './nav-bar.module.css';
import {useLocation, useRouteMatch} from "react-router-dom";
import {logout} from "../../services/actions/user";
import {TMessages} from "../../utils/types";
import {useAppDispatch} from "../../hooks";

const descriptions: TMessages = {
    '/profile': `В этом разделе вы можете \n изменить свои персональные данные`,
    '/profile/orders': 'Список заказов',
};

const NavBar: FC = () => {
    const {path} = useRouteMatch();
    const {pathname} = useLocation();
    const dispatch = useAppDispatch();

    const handleLogout = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(logout() as any);
    }

    return (
        <div className={navStyles.wrap}>
            <nav className={`mb-15 ${navStyles.nav}`}>
                <Link
                    text="Профиль"
                    type="sub"
                    exact={true}
                    to={path}
                />
                <Link
                    text="История заказов"
                    type="sub"
                    to={`${path}/orders`}
                />
                <Link
                    text="Выход"
                    type="sub"
                    onClick={handleLogout}
                    to={`/logout`}
                />
            </nav>
            <div className={navStyles.description}>
                {descriptions[pathname]}
            </div>
        </div>
    )
};

export default NavBar;