import React, {FC} from 'react';
import {WS_GET_ORDERS_ALL} from "../../utils/constants";
import OrderItem from "./item";
import Loader from "../elements/loader";
import {useConnection} from "../../hooks/useConnection";

const Feed: FC = () => {
    const messages = useConnection(WS_GET_ORDERS_ALL)?.messages;

    if (!messages || !messages.orders) {
        return <Loader/>;
    }

    return <>
        {messages.orders.map(order => <OrderItem key={order._id} {...order} />)}
    </>
};

export default Feed;