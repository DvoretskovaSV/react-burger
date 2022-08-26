import React, {FC, useEffect} from "react";
import {useLocation, useRouteMatch} from "react-router-dom";
import {TFeedOrder} from "../utils/types";
import {useAppDispatch} from "../hooks";
import {WS_GET_USER_ORDERS} from "../utils/constants";
import Details from "../components/orders-feed/details";
import {connectionCloseUserOrders, connectionStartUserOrders} from "../services/actions/ws";
import {Location} from "history";
import {useConnection} from "../hooks/useConnection";
import FetchError from "../components/elements/fetch-error";
import Loader from "../components/elements/loader";

type stateType = {
    background?: stateType;
} & Location;

interface MatchParams {
    id: string;
}

const UserOrderPage: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation<stateType>();

    const background = location.state && location.state.background;
    const messages = useConnection(WS_GET_USER_ORDERS)?.messages;

    useEffect(() => {
        if (!background) {
            dispatch(connectionStartUserOrders())
        }

        return () => {
            if (!background) {
                dispatch(connectionCloseUserOrders())
            }
        };
    }, []);

    const { params } = useRouteMatch<MatchParams>();

    if (!messages || !messages.orders) {
        return <Loader />;
    }

    const order = messages.orders.find(order => order._id === params.id);

    if (!order) {
        return <FetchError error='Заказ не найден' />;
    }

    return (
        <>
            <Details {...order as TFeedOrder} isPage={!background}/>
        </>
    );
};

export default UserOrderPage;