import { API_HOST, REFRESH_TOKEN } from "../constants/api";
import { getLocalStorage, setLocalStorage } from "./localStorage";
import { getCookie, setCookie } from "./cookie";
import { LOGIN_SUCCESS } from "../services/actions/user";


const checkResponse = (res: Response) => {
    return res.ok
        ? res.json()
        : res.json().then((err) => Promise.reject(err));
}

export const request = (url: string, options?: RequestInit) => {
    return fetch(`${API_HOST}${url}`, options).then(checkResponse);
}

export const refreshTokenRequest = () => {
    return fetch(REFRESH_TOKEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',

        },
        body: JSON.stringify({
            token: getLocalStorage('rtoken')
        })
    })
        .then(checkResponse)
}


export const fetchWithRefresh = async (url: string, options: RequestInit) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);

    } catch (err) {
        if ((err as Error).message === 'jwt expired') {
            const refreshData = await refreshTokenRequest();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            setCookie('atoken', refreshData.accessToken);
            setLocalStorage('rtoken', refreshData.refreshToken);
            options = {
                ...options,
                headers: {
                    ...options?.headers,
                    authorization: refreshData.accessToken,
                },
            };
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}



