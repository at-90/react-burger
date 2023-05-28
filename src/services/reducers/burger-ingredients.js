import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from '../actions/burger-ingredients';

const ingredientsState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
}
export const ingredientsReducer = (state = ingredientsState, action) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST: {
            return {
                ...state,
                itemsRequest: true,
                itemsFailed: false,
            }
        }
        case GET_ITEMS_SUCCESS: {

            return {
                ...state,
                itemsRequest: false,
                itemsFailed: false,
                items: action.items
            }
        }
        case GET_ITEMS_FAILED: {
            return {
                ...state,
                itemsRequest: false,
                itemsFailed: true,
            }
        }

        default: {
            return state

        }

    }
};


