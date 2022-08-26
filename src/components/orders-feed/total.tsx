import React, {FC} from "react";
import {WS_GET_ORDERS_ALL} from "../../utils/constants";
import totalStyles from "./total.module.css";
import Loader from "../elements/loader";
import {useConnection} from "../../hooks/useConnection";

const Total: FC = () => {
    const messages = useConnection(WS_GET_ORDERS_ALL)?.messages;

    if (!messages) {
        return <Loader/>;
    }

    return <>
        <div className="mb-15">
            <h3>Выполнено за всё время:</h3>
            <p className={`${totalStyles.textShadow} text text_type_digits-large`}>{messages.total}</p>
        </div>
        <div>
            <h3>Выполнено за сегодня:</h3>
            <p className={`${totalStyles.textShadow} text text_type_digits-large`}>{messages.totalToday}</p>
        </div>
    </>

};

export default Total;