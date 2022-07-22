import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import NavBar from "../components/profile/nav-bar";
import profileStyles from "./profile.module.css";
import UserForm from "../components/profile/user-form";

const ProfilePage = () => {
    const { path } = useRouteMatch();

    return <div className={profileStyles.wrap}>
        <NavBar />
        <Switch>
            <Route exact path={`${path}`}>
                <UserForm />
            </Route>
            <Route path={`${path}/orders`}>
                <div>Orders</div>
            </Route>
            <Route>
                <Redirect to={path} />
            </Route>
        </Switch>
    </div>
};

export default ProfilePage;