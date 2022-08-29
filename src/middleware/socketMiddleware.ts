import {
    TWebSocketActions, wsActions,
} from "../services/actions/ws";
import {ConnectionStatus} from "../utils/types";
import {getCookie} from "../utils/util";
import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState} from "../index";

const getOrigin = (url: string): string => url.split("?")[0];

const socketMiddleware = (wsActions: wsActions): Middleware  => (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let connections: { [key: string]: WebSocket } = {};
    const {wsInit, wsSendMessage, onOpen, wsClosed, onClose} = wsActions;

    return (next) => (action: TWebSocketActions) => {
        const { dispatch, getState } = store;
        const { type } = action;

        if (type === wsInit) {
            const { payload } = action;
            const token = getCookie('token');

            let { url } = payload;
            let baseUrl = url;

            if (token) {
                baseUrl = `${baseUrl}?token=${token}`;
            }

            if(connections && !connections[url]) {
                const socket = connections[url] = new WebSocket(`${baseUrl}`);

                socket.onopen = (event) => {
                    dispatch({
                        type: onOpen,
                        payload: { url: getOrigin((event.currentTarget as WebSocket).url)}
                    });
                };

                socket.onerror = event => {
                    console.error(event);
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({
                        type: wsSendMessage,
                        payload: {
                            url: getOrigin((event.currentTarget as WebSocket).url),
                            messages: restParsedData,
                        }
                    });
                };

                socket.onclose = event => {
                    dispatch({
                        type: wsClosed,
                        payload: {
                            url: getOrigin((event.currentTarget as WebSocket).url),
                        }
                    });
                };

            }
        }

        if (type === onClose) {
            const { payload } = action;
            const { url } = payload;
            const connection = getState().ws.openConnections[url];

            if (connections && connections[url]) {
                if (connection && connection.status !== ConnectionStatus.pending) {
                    connections[url].close();
                    delete connections[url];
                }
            }
        }

        return next(action);
    }
};

export default socketMiddleware;