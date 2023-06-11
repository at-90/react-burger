import {API_HOST, REFRESH_TOKEN} from "../constants/api";
import {getLocalStorage} from "./localStorage";


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
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: getLocalStorage('rtoken')
        })
    })
        .then(checkResponse)
}



