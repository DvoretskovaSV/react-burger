import jwtDecode from 'jwt-decode';
import {deleteCookie, getCookie} from "../utils/util";
import {refreshToken} from "../services/auth";
import {Middleware} from "redux";

type Token = {
    exp: number;
}

const jwtRefresh: Middleware = () => {
    return (next) => (action) => {
            if (typeof action === 'function') {
                const token = getCookie('token');

                if (token) {
                    try {
                        const decoded: Token = jwtDecode(token);
                        if (decoded.exp && (decoded.exp - Date.now() / 1000) < 10) {
                            const isStillRefreshing = getCookie('refreshToken');
                            if (isStillRefreshing) {
                                refreshToken().then(() => next(action))
                            }
                        }
                    } catch(error) {
                        if ((error as Error).name === 'InvalidTokenError') {
                            console.warn('invalid token format');
                            deleteCookie('token');
                        }
                    }
                }

            }
            return next(action);
        }
}

export default jwtRefresh;