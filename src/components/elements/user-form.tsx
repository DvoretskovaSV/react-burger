import React, {FC} from "react";
import formStyles from "./user-form.module.css";

type TProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    title?: string;
    children: JSX.Element | Array<JSX.Element>,
};

const UserForm: FC<TProps> = ({handleSubmit, children, title = ''}) => {
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