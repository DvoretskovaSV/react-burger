import React, {useEffect} from "react";
import ResetPassword from "../components/reset-password/reset-password";
import {useHistory} from "react-router-dom";
import {useAppSelector} from "../hooks";

const ResetPasswordPage = () => {
    const history = useHistory();
    const { isResetPassword } = useAppSelector(store => store.user);

    useEffect(() => {
        if (!isResetPassword) {
            history.replace("/login");
        }
    }, [isResetPassword]);


    return <ResetPassword/>;
}

export default ResetPasswordPage;