import {
    ADD_INGREDIENT, ADD_BUN, CONSTRUCTOR_REMOVE_ITEM, CONSTRUCTOR_UPDATE, CONSTRUCTOR_TOTALSUM, CONSTRUCTOR_RESET
} from "../actions/burger-constructor";

import {TBurgerConstructorActions} from '../actions/burger-constructor'
import {TDragIngredient, TIngredient} from "../../constants/types";

type TConstructorState = {
    buns:  Array<TDragIngredient  >,
    components: Array<TDragIngredient >,
    totalSum: number
}

const constructorState:TConstructorState  = {
    buns: [],
    components: [],
    totalSum: 0
}

export const constructorReducer = (state = constructorState, action:TBurgerConstructorActions): TConstructorState => {
    switch (action.type) {

        case ADD_INGREDIENT: {

            return {
                ...state,
                components: [...state.components, action.item]
            }
        }

        case ADD_BUN: {

            return {
                ...state,
                buns: [action.item]
            }
        }

        case CONSTRUCTOR_REMOVE_ITEM: {

            return {
                ...state,
                components: state.components.filter((elem: TIngredient) => elem.dragId !== action.dragId)
            }
        }
        case CONSTRUCTOR_UPDATE: {

            return {
                ...state,
                components: action.components
            }
        }
        case CONSTRUCTOR_TOTALSUM: {

            return {
                ...state,
                totalSum: action.totalSum
            }
        }
        case CONSTRUCTOR_RESET: {

            return constructorState

        }

        default: {
            return state;
        }
    }
};
