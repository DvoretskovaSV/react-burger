import {Redirect, Route} from 'react-router-dom';
import {useSelector} from "react-redux";
import Loader from "./elements/loader";

const ProtectedRoute = ({ children, ...rest }) => {
    const isAuthenticated = useSelector(store => store.user.isAuthenticated);
    const isUserLoading = useSelector(store => store.user.isUserLoading);

    if (isUserLoading) {
        return <Loader />;
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated && !isUserLoading ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location.pathname }
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectedRoute;