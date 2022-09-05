import { WebSocketReducer } from './ws'
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE} from "../actions/ws";

const initialState = {
    openConnections: {},
}

describe('ws reducer', () => {

    it('should return the initial state', () => {
        expect(WebSocketReducer(undefined, {})).toEqual(initialState)
    });

    it('should handle WS_CONNECTION_START', () => {
        expect(
            WebSocketReducer({
                ...initialState
            }, {
                type: WS_CONNECTION_START,
                payload: {
                    url: 'http://url',
                    status: 200,
                    rootProperty: 'property'
                }
            })
        ).toEqual({
            openConnections: {
                'http://url': {
                    status: 200,
                    rootProperty: 'property',
                }
            },
        })
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            WebSocketReducer({
                openConnections: {
                    'http://url': {
                        status: null,
                        rootProperty: 'property',
                    },
                    'http://url3': {
                        status: 1001,
                        rootProperty: 'property1',
                    }
                }
            }, {
                type: WS_CONNECTION_SUCCESS,
                payload: {
                    url: 'http://url3',
                }
            })
        ).toEqual({
            openConnections: {
                'http://url': {
                    status: null,
                    rootProperty: 'property',
                },
                'http://url3': {
                    status: 'open',
                    rootProperty: 'property1',
                }
            },
        })
    });

    it('should handle WS_GET_MESSAGE', () => {
        expect(
            WebSocketReducer({
                openConnections: {
                    'http://url': {
                        status: 200,
                        rootProperty: 'property',
                    }
                }
            }, {
                type: WS_GET_MESSAGE,
                payload: {
                    messages: [{ _id: '1_messages', text: '123456'}],
                    url: 'http://url'
                }
            })
        ).toEqual({
            openConnections: {
                'http://url': {
                    status: 200,
                    rootProperty: 'property',
                    messages: [{_id: '1_messages', text: '123456'}],
                }
            },
        })
    });

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            WebSocketReducer({
                openConnections: {
                    'http://url': {
                        status: null,
                        rootProperty: 'property',
                    },
                    'http://url3': {
                        status: 'open',
                        rootProperty: 'property1',
                    }
                },
            }, {
                type: WS_CONNECTION_CLOSED,
                payload: {
                    url: 'http://url',
                }
            })
        ).toEqual({
            openConnections: {
                'http://url3': {
                    rootProperty: 'property1',
                    status: 'open',
                }
            }
        })
    });
});