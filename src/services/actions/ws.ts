import { TMessages } from "../../constants/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_END: 'WS_CONNECTION_END' = 'WS_CONNECTION_END';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';

export const WS_CONNECTION_ORDERS_START: 'WS_CONNECTION_ORDERS_START' = 'WS_CONNECTION_ORDERS_START';
export const WS_CONNECTION_ORDERS_SUCCESS: 'WS_CONNECTION_ORDERS_SUCCESS' = 'WS_CONNECTION_ORDERS_SUCCESS';
export const WS_CONNECTION_ORDERS_ERROR: 'WS_CONNECTION_ORDERS_ERROR' = 'WS_CONNECTION_ORDERS_ERROR';
export const WS_GET_ORDERS_MESSAGE: 'WS_GET_ORDERS_MESSAGE' = 'WS_GET_ORDERS_MESSAGE';
export const WS_CONNECTION_ORDERS_CLOSED: 'WS_CONNECTION_ORDERS_CLOSED' = 'WS_CONNECTION_ORDERS_CLOSED';
export const WS_CONNECTION_ORDERS_END: 'WS_CONNECTION_ORDERS_END' = 'WS_CONNECTION_ORDERS_END';


export type TWsActions = {
    wsConnectionStart: typeof WS_CONNECTION_START;
    wsConnectionSuccess: typeof WS_CONNECTION_SUCCESS;
    wsConnectionError: typeof WS_CONNECTION_ERROR;
    wsConnectionClosed: typeof WS_CONNECTION_CLOSED;
    wsConnectionEnd: typeof WS_CONNECTION_END;
    wsGetMessage: typeof WS_GET_MESSAGE;
}

export type TWsOrderActions = {
    wsConnectionStart: typeof WS_CONNECTION_ORDERS_START;
    wsConnectionSuccess: typeof WS_CONNECTION_ORDERS_SUCCESS;
    wsConnectionError: typeof WS_CONNECTION_ORDERS_ERROR;
    wsConnectionClosed: typeof WS_CONNECTION_ORDERS_CLOSED;
    wsConnectionEnd: typeof WS_CONNECTION_ORDERS_END;
    wsGetMessage: typeof WS_GET_ORDERS_MESSAGE;
}


export const wsActions: TWsActions = {
    wsConnectionStart: WS_CONNECTION_START,
    wsConnectionSuccess: WS_CONNECTION_SUCCESS,
    wsConnectionError: WS_CONNECTION_ERROR,
    wsConnectionClosed: WS_CONNECTION_CLOSED,
    wsConnectionEnd: WS_CONNECTION_END,
    wsGetMessage: WS_GET_MESSAGE,
}
export const wsOrderActions: TWsOrderActions = {
    wsConnectionStart: WS_CONNECTION_ORDERS_START,
    wsConnectionSuccess: WS_CONNECTION_ORDERS_SUCCESS,
    wsConnectionError: WS_CONNECTION_ORDERS_ERROR,
    wsConnectionClosed: WS_CONNECTION_ORDERS_CLOSED,
    wsConnectionEnd: WS_CONNECTION_ORDERS_END,
    wsGetMessage: WS_GET_ORDERS_MESSAGE,
}


export type TWsConnectionActions =
    { type: typeof WS_CONNECTION_START; payload: string } |
    { type: typeof WS_CONNECTION_SUCCESS } |
    { type: typeof WS_CONNECTION_END } |
    { type: typeof WS_CONNECTION_ERROR; payload: WebSocketEventMap | string } |
    { type: typeof WS_GET_MESSAGE; payload: TMessages } |
    { type: typeof WS_CONNECTION_CLOSED; payload: WebSocketEventMap | string } |

    { type: typeof WS_CONNECTION_ORDERS_START; payload: string } |
    { type: typeof WS_CONNECTION_ORDERS_SUCCESS } |
    { type: typeof WS_CONNECTION_ORDERS_END } |
    { type: typeof WS_CONNECTION_ORDERS_ERROR; payload: WebSocketEventMap | string } |
    { type: typeof WS_GET_ORDERS_MESSAGE; payload: TMessages } |
    { type: typeof WS_CONNECTION_ORDERS_CLOSED; payload: WebSocketEventMap | string }


export type TWSActionProps = TWsActions | TWsOrderActions
