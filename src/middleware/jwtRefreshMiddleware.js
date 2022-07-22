import jwtDecode from 'jwt-decode';
import {getCookie} from "../utils/util";
import {refreshToken} from "../services/auth";

const jwtRefresh = () => {
    return (next) => (action) => {
        if (typeof action === 'function') {
            const token = getCookie('token');

            if (token) {
                const decoded = jwtDecode(token);
                if (decoded.exp && (decoded.exp - Date.now() / 1000) < 10) {
                    const isStillRefreshing = getCookie('refreshToken');
                    if (isStillRefreshing) {
                        refreshToken().then(() => next(action))
                    }
                }
            }

        }
        return next(action);
    }
}

export default jwtRefresh;