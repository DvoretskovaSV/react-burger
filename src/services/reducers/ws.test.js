import { WebSocketReducer } from './ws'
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE} from "../actions/ws";
import {initialState} from "./ws";

const successStatus = 200;
const openStatus = 1001;
const connections = [
    {
        url: 'http://url',
        property: 'property',
        messages: [{ _id: '1_messages', text: '123456'}],
    },
    {
        url: 'http://url3',
        property: 'property1',
    }
];

describe('ws reducer', () => {

    it('should return the initial state', () => {
        expect(WebSocketReducer(undefined, {})).toEqual(initialState)
    });

    it('should handle WS_CONNECTION_START', () => {
        expect(
            WebSocketReducer(initialState, {
                type: WS_CONNECTION_START,
                payload: {
                    url: connections[0].url,
                    status: successStatus,
                    rootProperty: connections[0].property,
                }
            })
        ).toEqual({
            openConnections: {
                [connections[0].url]: {
                    status: successStatus,
                    rootProperty: connections[0].property,
                }
            },
        })
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            WebSocketReducer({
                openConnections: {
                    [connections[0]]: {
                        status: null,
                        rootProperty: connections[0].property,
                    },
                    [connections[1]]: {
                        status: openStatus,
                        rootProperty: connections[1].property,
                    }
                }
            }, {
                type: WS_CONNECTION_SUCCESS,
                payload: {
                    url: connections[1],
                }
            })
        ).toEqual({
            openConnections: {
                [connections[0]]: {
                    status: null,
                    rootProperty: connections[0].property,
                },
                [connections[1]]: {
                    status: 'open',
                    rootProperty: connections[1].property,
                }
            },
        })
    });

    it('should handle WS_GET_MESSAGE', () => {
        expect(
            WebSocketReducer({
                openConnections: {
                    [connections[0]]: {
                        ...connections[0],
                        status: successStatus,
                    }
                }
            }, {
                type: WS_GET_MESSAGE,
                payload: {
                    messages: connections[0].messages,
                    url: connections[0]
                }
            })
        ).toEqual({
            openConnections: {
                [connections[0]]: {
                    ...connections[0],
                    status: successStatus,
                    messages: connections[0].messages,
                }
            },
        })
    });

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            WebSocketReducer({
                openConnections: {
                    [connections[0].url]: connections[0],
                    [connections[1].url]: {
                        ...connections[1],
                        status: 'open',
                    }
                },
            }, {
                type: WS_CONNECTION_CLOSED,
                payload: {
                    url: [connections[0].url],
                }
            })
        ).toEqual({
            openConnections: {
                [connections[1].url]: {
                    ...connections[1],
                    status: 'open',
                }
            }
        })
    });
});