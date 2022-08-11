import {Route, RouteProps, useHistory, useLocation} from 'react-router-dom';
import {FC, useEffect} from "react";
import {useAppSelector} from "../hooks";

interface StateType {
    from: { pathname: string }
}

interface IProtectedRouteProps extends RouteProps {
    children: JSX.Element | Array<JSX.Element>
}

const ProtectedRouteNoAuth: FC<IProtectedRouteProps> = ({ children, ...rest }) => {
    const {isAuthenticated, isUserLoading} = useAppSelector(store => store.user);
    const location = useLocation<StateType>();
    const history = useHistory();

    const { from } = location.state || { from: { pathname: '/' } };

    useEffect(() => {
        if (isAuthenticated && !isUserLoading) {
            history.replace(from);
        }
    });

    if (isAuthenticated || isUserLoading) {
        return null;
    }

    return (
        <Route
            {...rest}
            render={() => children}
        />
    );
}

export default ProtectedRouteNoAuth;