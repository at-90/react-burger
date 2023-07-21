
import {
    TWsConnectionActions,
    WS_CONNECTION_START,
    WS_CONNECTION_END,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/ws'
import { initialState, wsReducer } from './ws'


const mockMessage = {
    wsConnected: true,
    orders: [
        {
            _id: '64ba1c1982e277001bf91b5d',
            ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa0943'
            ],
            status: 'done',
            name: 'Space флюоресцентный бургер',
            createdAt: '2023-07-21T05:48:09.330Z',
            updatedAt: '2023-07-21T05:48:09.440Z',
            number: 13533
        },
        {
            _id: '64ba21a082e277001bf91b69',
            ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa0943'
            ],
            status: 'done',
            name: 'Space флюоресцентный бургер',
            createdAt: '2023-07-21T06:11:44.156Z',
            updatedAt: '2023-07-21T06:11:44.338Z',
            number: 13534
        },
        {
            _id: '64ba249982e277001bf91b7a',
            ingredients: [
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa0945'
            ],
            status: 'done',
            name: 'Space антарианский бургер',
            createdAt: '2023-07-21T06:24:25.872Z',
            updatedAt: '2023-07-21T06:24:26.007Z',
            number: 13535
        }
    ],
    total: 13179,
    totalToday: 115,
    error: ''
}

describe('Тест редьюсера wsReducer', () => {
    test('Action WS_CONNECTION_START', () => {
        const expected = {
            ...initialState
        };
        const received = wsReducer(initialState, {
            type: WS_CONNECTION_START,
            payload: 'wsurl'
        });
        expect(received).toEqual(expected)
    })

    test('Action WS_CONNECTION_SUCCESS', () => {
        const expected = {
            ...initialState,
            wsConnected: true,
        };
        const received = wsReducer(initialState, {
            type: WS_CONNECTION_SUCCESS
        });
        expect(received).toEqual(expected)
    })

    test('Action WS_CONNECTION_ERROR', () => {
        const expected = {
            ...initialState,
            orders: [],
            total: 0,
            totalToday: 0,
            wsConnected: false,
            error: 'event'
        };
        const received = wsReducer(initialState, {
            type: WS_CONNECTION_ERROR,
            payload: 'event'
        });
        expect(received).toEqual(expected)
    })

    test('Action WS_CONNECTION_CLOSED', () => {
        const expected = {
            ...initialState,
            orders: [],
            total: 0,
            totalToday: 0,
            wsConnected: false,
            error: 'event'
        };
        const received = wsReducer(initialState, {
            type: WS_CONNECTION_CLOSED,
            payload: 'event'
        });
        expect(received).toEqual(expected)
    })

    test('Action WS_CONNECTION_END', () => {
        const expected = {
            ...initialState
        };
        const received = wsReducer(initialState, {
            type: WS_CONNECTION_END
        });
        expect(received).toEqual(expected)
    })

    test('Action WS_GET_MESSAGE', () => {
        const expected = {
            ...initialState,
            orders: mockMessage.orders,
            total: mockMessage.total,
            totalToday: mockMessage.totalToday,
        };
        const received = wsReducer(initialState, {
            type: WS_GET_MESSAGE,
            payload: mockMessage
        });
        expect(received).toEqual(expected)
    })


    test('Return InitialState', () => {
        const expected = {
            ...initialState
        };
        const received = wsReducer(undefined, {} as TWsConnectionActions);
        expect(received).toEqual(expected)
    })

})