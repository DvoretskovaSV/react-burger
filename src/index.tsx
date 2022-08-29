import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {rootReducer} from "./services/reducers";
import jwtRefresh from "./middleware/jwtRefreshMiddleware";
import socketMiddleware from "./middleware/socketMiddleware";
import moment from 'moment'
import 'moment/locale/ru';
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "./services/actions/ws";
moment.locale('ru')

const composeEnhancers = (process.env.NODE_ENV !== 'production' &&
    (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

export const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_GET_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    wsClosed: WS_CONNECTION_CLOSED,
    onMessage: WS_GET_MESSAGE,
    onClose: WS_CONNECTION_CLOSE
};

const enhancer = composeEnhancers(applyMiddleware(jwtRefresh, thunk, socketMiddleware(wsActions)));
const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
