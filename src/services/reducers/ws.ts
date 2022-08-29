import {
    TWebSocketActions,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "../actions/ws";
import {ConnectionStatus, TFeedOrder} from "../../utils/types";

export type TFeedOrderMessages<T> = {
    orders: Array<T>,
    total: number,
    totalToday: number,
};

type TMessages = TFeedOrderMessages<TFeedOrder>;

type TConnection = {
    status: string;
    rootProperty: string;
    messages?: TMessages,
}

interface IState {
    openConnections: { [key: string]: TConnection };
}

const initialState: IState = {
    openConnections: {},
}

export const WebSocketReducer = (state = initialState, action: TWebSocketActions): IState => {
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
                ...state,
                openConnections: {
                    ...state.openConnections,
                    [action.payload.url]: {
                        status: action.payload.status,
                        rootProperty: action.payload.rootProperty,
                    },
                }
            }

        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                openConnections: {
                    ...state.openConnections,
                    [action.payload.url]: {
                        ...state.openConnections[action.payload.url],
                        status: ConnectionStatus.open,
                    },
                }
            }

        case WS_GET_MESSAGE:
            return {
                ...state,
                openConnections: {
                    [action.payload.url]: {
                        ...state.openConnections[action.payload.url],
                        messages: action.payload.messages,
                    },
                },
            }

        case WS_CONNECTION_CLOSED:
            const openConnections = {...state.openConnections};
            delete openConnections[action.payload.url];

            return {
                ...state,
                openConnections
            }

        default: {
            return state;
        }
    }

}