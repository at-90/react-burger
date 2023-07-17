import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
    TBurgerIngredientsActions
} from '../actions/burger-ingredients';
import {TDragIngredient, TIngredient} from "../../constants/types";

type TingredientsState = {
    items: Array< TIngredient >,
    itemsRequest: boolean,
    itemsFailed: boolean,
}

const ingredientsState:TingredientsState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
}
export const ingredientsReducer = (state = ingredientsState, action:TBurgerIngredientsActions): TingredientsState => {
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


