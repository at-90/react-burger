import {API_HOST, REFRESH_TOKEN} from "../constants/api";
import {getLocalStorage, setLocalStorage} from "./localStorage";
import {getCookie, setCookie} from "./cookie";
import {LOGIN_SUCCESS} from "../services/actions/user";


const checkResponse = (res) => {
    return res.ok
        ? res.json()
        : res.json().then((err) => Promise.reject(err));
}

export const request = (url, options) => {
    return fetch(`${API_HOST}${url}`, options).then(checkResponse);
}

export const refreshTokenRequest = () =>{
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


export const fetchWithRefresh = async(url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);

    } catch (err) {
        if (err.message === 'jwt expired') {
            const {refreshToken, accessToken} = await refreshTokenRequest();
            console.log(accessToken)
            let authToken = res.accessToken.split('Bearer ')[1];
            if (authToken) {
                setCookie('atoken', authToken);
                setLocalStorage('rtoken', refreshToken)
            }
            options.headers.authorization = accessToken;

            const res = await fetch(url, options);

            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}



