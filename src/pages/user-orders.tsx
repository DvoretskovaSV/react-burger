import React, {FC, useEffect} from "react";
import {useAppDispatch} from "../hooks";
import {
    connectionCloseUserOrders,
    connectionStartUserOrders
} from "../services/actions/ws";
import {WS_GET_USER_ORDERS} from "../utils/constants";
import OrderItem from "../components/orders-feed/item";
import orderStyles from "./user-orders.module.css";
import Loader from "../components/elements/loader";
import {useConnection} from "../hooks/useConnection";

const UserOrdersPage: FC = () => {
    const dispatch = useAppDispatch();
    const messages = useConnection(WS_GET_USER_ORDERS)?.messages;

    useEffect(() => {
        dispatch(connectionStartUserOrders());

        return () => {
            dispatch(connectionCloseUserOrders());
        };
    }, []);

    if (!messages) {
        return <Loader />;
    }

    return <div className={`${orderStyles.wrap} custom-scroll`}>
        {messages.orders.map(order => <OrderItem key={order._id} {...order} visibleStatus={true} />)}
    </div>;
}

export default UserOrdersPage;