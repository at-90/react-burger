import {TDragIngredient} from "../../constants/types";

export const ADD_INGREDIENT:'ADD_INGREDIENT' = "ADD_INGREDIENT";
export const ADD_BUN:'ADD_BUN' = "ADD_BUN";
export const CONSTRUCTOR_REMOVE_ITEM:'CONSTRUCTOR_REMOVE_ITEM' = 'CONSTRUCTOR_REMOVE_ITEM';
export const CONSTRUCTOR_UPDATE:'CONSTRUCTOR_UPDATE' = 'CONSTRUCTOR_UPDATE';
export const CONSTRUCTOR_TOTALSUM:'CONSTRUCTOR_TOTALSUM' = 'CONSTRUCTOR_TOTALSUM';
export const CONSTRUCTOR_RESET:'CONSTRUCTOR_RESET' = 'CONSTRUCTOR_RESET';

export type TBurgerConstructorActions =
    { type: typeof ADD_INGREDIENT ; item: TDragIngredient    } |
    { type: typeof ADD_BUN ; item: TDragIngredient  } |
    { type: typeof CONSTRUCTOR_REMOVE_ITEM; dragId: number | string | undefined } |
    { type: typeof CONSTRUCTOR_UPDATE; components: Array<TDragIngredient> } |
    { type:  typeof CONSTRUCTOR_TOTALSUM; totalSum: number  }|
    { type:  typeof CONSTRUCTOR_RESET }



