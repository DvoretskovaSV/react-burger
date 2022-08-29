import React, {FC} from "react";
import {WS_GET_ORDERS_ALL} from "../../utils/constants";
import {orderStatuses} from "../../utils/data";
import statusStyles from "./status.module.css";
import Loader from "../elements/loader";
import {useConnection} from "../../hooks/useConnection";

type TMapOrders = { [key in string]: Array<number>; };

const Status: FC = () => {
    const messages = useConnection(WS_GET_ORDERS_ALL)?.messages;

    if (!messages || !messages.orders) {
        return <Loader/>;
    }

    const mapOrders = messages.orders.reduce<TMapOrders>((acc, item, index) => {
        const internalType = orderStatuses[item.status].internalType;

        if (!acc[internalType]) {
            acc[internalType] = [];
        }

        acc[internalType].push(item.number);
        return acc;
    }, {} as TMapOrders);

    return <div className={statusStyles.wrap}>
        {Object.values(orderStatuses).map(item => {
                if (!item.text) return null;
                return <div key={item.typeId}>
                    <h3>{item.text}:</h3>
                    <ul className={`${statusStyles.section} text text_type_digits-default ${statusStyles[item.typeId]} ${item.typeId}`}>
                        {(mapOrders[item.internalType] || []).slice(0, 10).map(item =>
                            <li key={item}>
                                {item}
                            </li>
                        )}
                    </ul>
                </div>
            }
        )}
    </div>

};

export default Status;