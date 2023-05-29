import { API_HOST } from "../constants/api";


const checkResponse = (res) => {
    return res.ok
        ? res.json()
        : res.json().catch(() => { throw new Error('Ошибка: ' + res.status) });
}

export const request = (url, options) => {
    return fetch(`${API_HOST}${url}`, options).then(checkResponse);
}


