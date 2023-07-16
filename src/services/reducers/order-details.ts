import {
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_FAILED, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_RESET, TOrderDetailsActions,
} from "../actions/order-details";
import {TIngredient} from "../../constants/types";

export type TOrderDetailsReducerOrder = {
    success: boolean;
    name: string;
    order: {
        ingredients: Array<string>;
        _id: string;
        owner: {
            name: string;
            email: string;
            createdAt: string;
            updatedAt: string;
        };
        name: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        number: number;
        price: number;
        }
}

export type TOrderDetailsState = {
    order: Array<TIngredient>| null;
    isLoading: boolean;
    hasError: boolean;
    currentOrder: TOrderDetailsReducerOrder  | null
}


const orderState:TOrderDetailsState  = {
    order:  null,
    isLoading: false,
    hasError: false,
    currentOrder: null
};

export const orderReducer = (state = orderState, action:TOrderDetailsActions): TOrderDetailsState => {
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

