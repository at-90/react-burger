
import {
    TWsConnectionActions,
    WS_CONNECTION_START,
    WS_CONNECTION_END,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/ws'

import {TOrderItemComposition} from "../../constants/types";

type WsStore = {
    orders: Array<TOrderItemComposition>;
    wsConnected: boolean;
    total: number;
    totalToday: number;
    error?: string | null | WebSocketEventMap
}

const initialState: WsStore = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: '',
}

export const wsReducer = (state = initialState, action: TWsConnectionActions):WsStore  => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state,
            }
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true,
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                wsConnected: false,
                error: action.payload
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                wsConnected: false,
                error:  action.payload
            };
        }
        case WS_CONNECTION_END: {
            return {
                ...initialState
            }
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        }

        default: {
            return state;
        }
    }
};