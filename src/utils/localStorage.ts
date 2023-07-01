export const getLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    if (data !== null) {
        return JSON.parse(data);
    }
    return {}
}

export const setLocalStorage = (key: string, data: string) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const delLocalStorage = (key : string) => {
    localStorage.removeItem(key);
}