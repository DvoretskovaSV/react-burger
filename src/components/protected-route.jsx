import { Redirect, Route } from 'react-router-dom';
import {useSelector} from "react-redux";

const ProtectedRoute = ({ children, ...rest }) => {
    const isAuthenticated = useSelector(store => store.user.isAuthenticated);
    const isUserLoaded = useSelector(store => store.user.isUserLoaded);

    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectedRoute;