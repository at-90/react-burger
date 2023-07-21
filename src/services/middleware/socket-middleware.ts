import type { Middleware } from 'redux';
import { TApplicationActions } from "../../constants/types";
import { TWSActionProps } from "../actions/ws";
import { RootState } from "../../constants/types";

export const socketMiddleware = (wsActions: TWSActionProps, wsUrl: string): Middleware<RootState> => {
    return ((store) => {
        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {
            const {
                wsConnectionClosed,
                wsConnectionError,
                wsConnectionStart,
                wsConnectionSuccess,
                wsGetMessage,
            } = wsActions;
            const { dispatch } = store;


            if (action.type === wsConnectionStart) {

                socket = new WebSocket(action.payload);
            }
            if (socket) {


                socket.onopen = event => {
                    dispatch({ type: wsConnectionSuccess, payload: event });
                };


                socket.onerror = event => {
                    dispatch({ type: wsConnectionError, payload: event });

                };


                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: wsGetMessage, payload: parsedData });

                };

                socket.onclose = event => {
                    dispatch({ type: wsConnectionClosed, payload: event });
                    if (event.wasClean) {
                        console.log('Соединение закрыто корректно');
                        console.log(`Код закрытия - ${event.code}`);
                        console.log(`Причина закрытия - ${event.reason}`)
                    } else {
                        console.log(`Соединение закрыто с кодом -  ${event.code}`);
                    }
                };
            }

            next(action);
        };
    }) as Middleware;

};