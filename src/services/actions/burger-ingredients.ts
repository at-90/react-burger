import { request } from '../../utils/getApiData';
import { API_INGREDIENTS } from '../../constants/api';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const CANCEL_PROMO = 'CANCEL_PROMO';


export function getApiIngredients() {
    return function (dispatch: any) {
        dispatch({
            type: GET_ITEMS_REQUEST
        });
        request(API_INGREDIENTS).then(res => {

            if (res && res.success) {
                const data = res.data.map((elem:any) => ({ ...elem, qty: 0 }));
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    items: data
                });
            } else {
                dispatch({
                    type: GET_ITEMS_FAILED
                });
            }
        }).catch(e => console.log('error Api'));
    };
}

