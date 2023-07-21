import { INGREDIENT_DETAILS_SET, TIngredientsDetails } from "../actions/ingredients-details";

export const currentIngredientState = {}
export const currentIngredientReducer = (state = currentIngredientState, action: TIngredientsDetails) => {
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
