import { Dispatch } from 'redux';
import {TBurgerIngredientsActions} from "../services/actions/burger-ingredients";
import {TBurgerConstructorActions} from "../services/actions/burger-constructor";
import {TOrderDetailsActions} from "../services/actions/order-details";
import {TUsersActions} from "../services/actions/user";
import {TWSActionProps, TWsActions, TWsConnectionActions, TWsOrderActions} from "../services/actions/ws";
import {TAppActions} from "../services/actions";
import {TIngredientsDetails} from "../services/actions/ingredients-details";
import {rootReducer} from "../services/reducers";
import {ThunkAction} from "redux-thunk";
import { Action, ActionCreator } from 'redux';

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    dragId?: number |  string
}

export type TDragIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    dragId: number |  string
}


export type TOrder = {
    number: number
}

export type TOrderDetails = {
    order: TOrder
}

export type TOrderItemComposition = {
    _id: string;
    ingredients: Array<string>;
    status: 'created' | 'pending' | 'done' | string;
    createdAt: string;
    updatedAt: string;
    number: number;
    name: string;
}

export type TOrderItem = {
    order: TOrderItemComposition ;
    type: string
}

export type TUser = {
    name: string;
    email: string;
}

export type TError = string | WebSocketEventMap | null | undefined;

export type TMessages = {
    orders: Array<TOrderItemComposition>;
    total: number;
    totalToday: number;
}

export type RootState = ReturnType<typeof rootReducer>;


/*export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    TApplicationActions
    >;*/

// export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
    >;

export type TApplicationActions =  TBurgerConstructorActions  | TBurgerIngredientsActions | TOrderDetailsActions | TUsersActions  | TWsConnectionActions | TAppActions | TIngredientsDetails;

export type AppDispatch = Dispatch<TApplicationActions>;
