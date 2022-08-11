import {Redirect, Route, useLocation} from 'react-router-dom';
import Loader from "./elements/loader";
import {FC} from "react"
import { RouteProps } from 'react-router-dom';
import {useAppSelector} from "../hooks";

interface IProtectedRouteProps extends RouteProps {
    children: JSX.Element | Array<JSX.Element>
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, ...rest }) => {
    const {isAuthenticated, isUserLoading} = useAppSelector(store => store.user);
    const location = useLocation();

    if (isUserLoading) {
        return <Loader />;
    }

    return (
        <Route
            {...rest}
            render={() =>
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