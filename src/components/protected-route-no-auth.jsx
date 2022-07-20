import {Route, useHistory, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useEffect} from "react";

const ProtectedRouteNoAuth = ({ children, ...rest }) => {
    const isAuthenticated = useSelector(store => store.user.isAuthenticated);
    const isUserLoaded = useSelector(store => store.user.isUserLoaded);
    const location = useLocation();
    const history = useHistory();
    const { from } = location.state || { from: { pathname: '/' } };

    useEffect(() => {
        if (isAuthenticated && isUserLoaded) {
            history.replace(from);
        }
    });

    if ((isAuthenticated && isUserLoaded) || !isUserLoaded) {
        return null;
    }

    return (
        <Route
            {...rest}
            render={( ) => (children)
            }
        />
    );
}

export default ProtectedRouteNoAuth;