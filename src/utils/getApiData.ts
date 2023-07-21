import { API_HOST, API_USER, REFRESH_TOKEN } from "../constants/api";
import { getLocalStorage, setLocalStorage } from "./localStorage";
import { getCookie, setCookie } from "./cookie";

const checkResponse = (res: Response) => {
    return res.ok
        ? res.json()
        : res.json().then((err) => {
            console.log(res.status)
            return Promise.reject(err)
        });
}

export const request = (url: string, options?: RequestInit) => {
    return fetch(`${API_HOST}${url}`, options).then(checkResponse);
}

export const refreshTokenRequest = () => {
    return fetch(API_HOST + REFRESH_TOKEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ token: getLocalStorage('rtoken') })
    })
        .then(checkResponse)
}

export const getUser = () => {
    return fetchWithRefresh(API_HOST + API_USER, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: 'Bearer ' + getCookie("atoken") || "",
        },
    });
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(url, options);
        return await checkResponse(response);

    } catch (error) {
        console.log((error as Error).message)
        if ((error as Error).message === "jwt expired") {
            const refreshData = await refreshTokenRequest();


            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            setLocalStorage("rtoken", refreshData.refreshToken);
            let authToken = refreshData.accessToken.split('Bearer ')[1];
            if (authToken) {
                setCookie('atoken', authToken);
            }
            options = {
                ...options,
                headers: {
                    ...options?.headers,
                    authorization: refreshData.accessToken,
                },
            };
            const response = await fetch(url, options);
            return await checkResponse(response);
        } else {
            return Promise.reject(error);
        }
    }
}



