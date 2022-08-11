import React from "react";
import formStyles from "./user-form.module.css";

const UserForm = ({handleSubmit, title = '', children}) => {
    return (
        <div className={formStyles.wrap}>
            <h2 className={formStyles.header}>{title}</h2>
            <form className={formStyles.form} onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
            }}>
                {children}
            </form>
        </div>
    )
};

export default UserForm;