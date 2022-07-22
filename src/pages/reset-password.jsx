import React, {useEffect} from "react";
import ResetPassword from "../components/reset-password/reset-password";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

const ResetPasswordPage = () => {
    const history = useHistory();
    const isResetPassword = useSelector(store => store.user.isResetPassword);

    useEffect(() => {
        if (!isResetPassword) {
            history.replace("/login");
        }
    }, [isResetPassword]);


    return <ResetPassword/>;
}

export default ResetPasswordPage;