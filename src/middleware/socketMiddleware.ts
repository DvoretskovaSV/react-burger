import {
    TWebSocketActions,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "../services/actions/ws";
import {ConnectionStatus} from "../utils/types";
import {getCookie} from "../utils/util";
import {Middleware} from "redux";

const getOrigin = (url: string): string => url.split("?")[0];

const socketMiddleware: Middleware = (store) => {
    let connections: { [key: string]: WebSocket } = {};

    return (next) => (action: TWebSocketActions) => {
        const { dispatch, getState } = store;
        const { type } = action;

        if (type === WS_CONNECTION_START) {
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
                        type: WS_CONNECTION_SUCCESS,
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
                        type: WS_GET_MESSAGE,
                        payload: {
                            url: getOrigin((event.currentTarget as WebSocket).url),
                            messages: restParsedData,
                        }
                    });
                };

                socket.onclose = event => {
                    dispatch({
                        type: WS_CONNECTION_CLOSED,
                        payload: {
                            url: getOrigin((event.currentTarget as WebSocket).url),
                        }
                    });
                };

            }
        }

        if (type === WS_CONNECTION_CLOSE) {
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