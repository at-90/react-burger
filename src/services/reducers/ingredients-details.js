import { INGREDIENT_DETAILS_SET } from "../actions/ingredients-details";

const currentIngredientState = {}
export const currentIngredientReducer = (state = currentIngredientState, action) => {
    switch (action.type) {
        case INGREDIENT_DETAILS_SET: {
            return {
                ...action.item
            }
        }
        default: {
            return state
        }

    }
};
