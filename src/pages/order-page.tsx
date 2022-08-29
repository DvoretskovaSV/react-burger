import React, {FC, useEffect} from "react";
import {useLocation, useRouteMatch} from "react-router-dom";
import {TFeedOrder} from "../utils/types";
import {useAppDispatch} from "../hooks";
import {WS_GET_ORDERS_ALL} from "../utils/constants";
import Details from "../components/orders-feed/details";
import {connectionCloseOrdersAll, connectionStartOrdersAll} from "../services/actions/ws";
import {Location} from "history";
import Loader from "../components/elements/loader";
import {useConnection} from "../hooks/useConnection";

type stateType = {
    background?: stateType;
} & Location;

interface MatchParams {
    id: string;
}

const OrderPage: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation<stateType>();
    const messages = useConnection(WS_GET_ORDERS_ALL)?.messages;

    const background = location.state && location.state.background;

    useEffect(() => {
        if (!background) {
            dispatch(connectionStartOrdersAll());
        }

        return () => {
            if (!background) {
                dispatch(connectionCloseOrdersAll());
            }
        };
    }, []);

    const { params } = useRouteMatch<MatchParams>();

    if (!messages || !messages.orders) {
        return <Loader />;
    }

    const order = messages.orders.find(order => order._id === params.id);

    return (
        <>
           <Details {...order as TFeedOrder} isPage={!background}/>
        </>
    );
};

export default OrderPage;