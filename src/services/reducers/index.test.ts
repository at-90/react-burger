import { appReducer } from "./index";
import { APP_MESSAGE, CLEAR_APP_MESSAGES, TAppActions } from "../actions";

const appState = { message: '' }

describe('Тест редьюсера appReducer', () => {

    test('Action APP_MESSAGE', () => {
        const expected = {
            ...appState,
            message: 'system info'
        };
        const received = appReducer(appState, {
            type: APP_MESSAGE,
            message: 'system info'
        });
        expect(received).toEqual(expected)
    })

    test('Action CLEAR_APP_MESSAGES', () => {
        const expected = {
            ...appState,
            message: ''
        };
        const received = appReducer(appState, {
            type: CLEAR_APP_MESSAGES,
            message: ''
        });
        expect(received).toEqual(expected)
    })

})