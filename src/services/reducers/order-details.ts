import {
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_FAILED, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_RESET,
} from "../actions/order-details";

const orderState = {
    order: null,
    isLoading: false,
    hasError: false,
};

export const orderReducer = (state = orderState, action:any) => {
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

