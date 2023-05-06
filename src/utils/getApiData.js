
/**
 * Отправляет запрос Fetch, 
 * @param {String} url - адрес запроса 
 * @returns {String} промис с данными из запроса 
 */
export const getDataResource = async (url) => {

    try {

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Ошибка: ' + res.status);
        }
        const data = await res.json();
        return data.data;


    } catch (error) {
        console.log("Не загрузились данные по API. " + error.message);
        return false;
    }

}
