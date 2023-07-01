import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { constructorReducer } from './burger-constructor';
import { currentIngredientReducer } from './ingredients-details';
import { orderReducer } from './order-details';
import { userReducer } from './user';
import {APP_MESSAGE, CLEAR_APP_MESSAGES} from "../actions";

const appState = {message: ''}

export const appReducer =(state=appState, action:any) =>{
    switch (action.type){

        case APP_MESSAGE: {
            return {
                ...state,
                message: action.message
            }
        }

        case CLEAR_APP_MESSAGES: {
            return {
                ...state,
                message: ''
            }
        }

        default: {
            return state;
        }
    }
}

export const rootReducer = combineReducers({
    app:appReducer,
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    currentIngredient: currentIngredientReducer,
    orderDetails: orderReducer,
    user: userReducer
})