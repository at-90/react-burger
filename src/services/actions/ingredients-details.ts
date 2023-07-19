import {TIngredient} from "../../constants/types";

export const INGREDIENT_DETAILS_SET:'INGREDIENT_DETAILS_SET' = 'INGREDIENT_DETAILS_SET'


export type TIngredientsDetails = { type: typeof INGREDIENT_DETAILS_SET; item:  TIngredient }
