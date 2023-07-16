import { API_ORDERS, API_ORDER } from '../../constants/api';
import { request } from '../../utils/getApiData';
import {AppDispatch, TIngredient} from "../../constants/types";
import {getCookie} from "../../utils/cookie";

export const ORDER_DETAILS_REQUEST:'ORDER_DETAILS_REQUEST' = 'ORDER_DETAILS_REQUEST';
export const ORDER_DETAILS_SUCCESS:'ORDER_DETAILS_SUCCESS' = 'ORDER_DETAILS_SUCCESS';
export const ORDER_DETAILS_FAILED:'ORDER_DETAILS_FAILED' = 'ORDER_DETAILS_FAILED';
export const ORDER_DETAILS_RESET:'ORDER_DETAILS_RESET' = 'ORDER_DETAILS_RESET';

export type TOrderDetailsActions =
    { type: typeof ORDER_DETAILS_REQUEST } |
    { type: typeof ORDER_DETAILS_SUCCESS; order: Array<TIngredient> } |
    { type: typeof ORDER_DETAILS_FAILED } |
    { type: typeof ORDER_DETAILS_RESET }


export const checkout = (orderList: Array<TIngredient>) => {

    const ingredientsId = orderList.map((elem:TIngredient) => elem._id)
    return (dispatch: AppDispatch) => {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        });

        request(API_ORDERS, {
            method: 'post',
            headers: { 'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'Bearer '+getCookie('atoken') },
            body: JSON.stringify({ ingredients: ingredientsId }),
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

export function getOrder(id: string) {
    return  (dispatch: AppDispatch) => {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        request(`${API_ORDER}/${id}`)
            .then((response) => {
                dispatch({
                    type: ORDER_DETAILS_SUCCESS,
                    order: response.orders[0],
                });
            })
            .catch(() => {
                dispatch({ type: ORDER_DETAILS_FAILED });
            });
    };
}
