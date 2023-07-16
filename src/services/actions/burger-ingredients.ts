import { request } from '../../utils/getApiData';
import { API_INGREDIENTS } from '../../constants/api';
import {AppDispatch, TIngredient} from "../../constants/types";
import {
    ADD_BUN,
    ADD_INGREDIENT,
    CONSTRUCTOR_REMOVE_ITEM, CONSTRUCTOR_RESET,
    CONSTRUCTOR_TOTALSUM,
    CONSTRUCTOR_UPDATE
} from "./burger-constructor";

export const GET_ITEMS_REQUEST:'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS:'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED:'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export type TBurgerIngredientsActions =
    { type: typeof GET_ITEMS_REQUEST} |
    { type: typeof GET_ITEMS_SUCCESS; items: Array<TIngredient> } |
    { type: typeof GET_ITEMS_FAILED }


export function getApiIngredients() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ITEMS_REQUEST
        });
        request(API_INGREDIENTS).then(res => {

            if (res && res.success) {
                const data = res.data.map((elem:TIngredient) => ({ ...elem, qty: 0 }));
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

