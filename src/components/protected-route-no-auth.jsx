import {Route, useHistory, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useEffect} from "react";

const ProtectedRouteNoAuth = ({ children, ...rest }) => {
    const isAuthenticated = useSelector(store => store.user.isAuthenticated);
    const isUserLoading = useSelector(store => store.user.isUserLoading);
    const location = useLocation();
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