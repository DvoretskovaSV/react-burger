import {WS_GET_ORDERS_ALL, WS_GET_USER_ORDERS} from "../../utils/constants";
import {ConnectionStatus} from "../../utils/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';

interface IConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: {
        url: string;
        rootProperty: string;
        status: ConnectionStatus;
    }
}

interface IConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: {
        url: string;
    }
}

interface IConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly payload: {
        url: string;
    }
}


interface IConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSE;
    readonly payload: {
        url: string;
    }
}

interface IConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}

interface IConnectionGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: {
        url: string;
        messages: any;
    }
}

export type TWebSocketActions =
    IConnectionStart
    | IConnectionSuccess
    | IConnectionClose
    | IConnectionError
    | IConnectionGetMessage
    | IConnectionClosed;

export const connectionStartOrdersAll  = () : IConnectionStart => {
    return {
        type: 'WS_CONNECTION_START',
        payload: {
            url: WS_GET_ORDERS_ALL,
            rootProperty: 'orders',
            status: ConnectionStatus.pending,
        }
    };
};

export const connectionCloseOrdersAll = () : IConnectionClose => {
    return {
        type: WS_CONNECTION_CLOSE,
        payload: {
            url: WS_GET_ORDERS_ALL,
        }
    };
};

export const connectionStartUserOrders  = () : IConnectionStart => {
    return {
        type: 'WS_CONNECTION_START',
        payload: {
            url: WS_GET_USER_ORDERS,
            rootProperty: 'orders',
            status: ConnectionStatus.pending,
        }
    };
};

export const connectionCloseUserOrders = () : IConnectionClose => {
    return {
        type: WS_CONNECTION_CLOSE,
        payload: {
            url: WS_GET_USER_ORDERS,
        }
    };
};