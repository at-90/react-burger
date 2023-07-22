import {
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAILED,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_RESET,
    TOrderDetailsActions,
    CURRENT_ORDER_DETAILS_SUCCESS,
} from "../actions/order-details";
import { TFullOrderDetails, TIngredient } from "../../constants/types";
export type TOrderDetailsCurrentOrder = {
    _id: string,
    ingredients: Array<string>;
    owner: string;
    name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    number: number;

}
export type TOrderDetailsReducerOrder = {

    ingredients: Array<string>;
    _id: string;
    owner: string;
    name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    currentOrder: TOrderDetailsCurrentOrder | null

}

export type TOrderOrder = {
    _id: string,
    ingredients: Array<TIngredient>,
    name: string,
    number: number,
    status: string,
    createdAt: string,
    updatedAt: string,
}

export type TOrderDetailsState = {
    order: TFullOrderDetails | null;
    isLoading: boolean;
    hasError: boolean;
    currentOrder: TOrderDetailsCurrentOrder | null
}


export const orderState: TOrderDetailsState = {
    order: null,
    isLoading: false,
    hasError: false,
    currentOrder: null
};

export const orderReducer = (state = orderState, action: TOrderDetailsActions): TOrderDetailsState => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ORDER_DETAILS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                hasError: false,
                order: action.order,
            }
        }
        case CURRENT_ORDER_DETAILS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                hasError: false,
                currentOrder: action.currentOrder,
            }
        }

        case ORDER_DETAILS_FAILED: {
            return {
                ...state,
                isLoading: false,
                hasError: true,
            }
        }

        case ORDER_DETAILS_RESET: {
            return {
                ...state,
                order: null,
                isLoading: false,
                hasError: false

            }
        }

        default: {
            return state;
        }
    }
};

