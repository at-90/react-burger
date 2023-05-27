import { API_ORDERS } from '../../constants/api';
import { request } from '../../utils/getApiData';
export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAILED = "ORDER_DETAILS_FAILED";
export const ORDER_DETAILS_RESET = "ORDER_DETAILS_RESET";

export const checkout = (orderList) => {
    return (dispatch) => {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        });

        request(API_ORDERS, {
            method: 'post',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ ingredients: orderList }),
        })
            .then((response) => {
                dispatch({
                    type: ORDER_DETAILS_SUCCESS,
                    order: response,
                });
            })
            .catch(() => {
                dispatch({
                    type: ORDER_DETAILS_FAILED,
                });
            });
    };
};

export const burgerConstructorClear = () => {
    return (dispatch) => {
        dispatch({
            type: ORDER_DETAILS_RESET,
        });
    };
};