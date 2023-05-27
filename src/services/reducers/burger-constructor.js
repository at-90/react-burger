import {
    ADD_INGREDIENT, ADD_BUN, CONSTRUCTOR_REMOVE_ITEM, CONSTRUCTOR_UPDATE
} from "../actions/burger-constructor";

const constructorState = {
    buns: [],
    components: []
}

export const constructorReducer = (state = constructorState, action) => {
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
                components: state.components.filter((elem) => elem.dragId !== action.dragId)
            }
        }
        case CONSTRUCTOR_UPDATE: {

            return {
                ...state,
                components: action.components
            }
        }

        default: {
            return state;
        }
    }
};
