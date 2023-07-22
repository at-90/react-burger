
import {
    TWsConnectionActions,
    WS_CONNECTION_ORDERS_START,
    WS_CONNECTION_ORDERS_END,
    WS_CONNECTION_ORDERS_SUCCESS,
    WS_CONNECTION_ORDERS_ERROR,
    WS_CONNECTION_ORDERS_CLOSED,
    WS_GET_ORDERS_MESSAGE
} from '../actions/ws'

import { initialState, wsProfileReducer } from './ws-profile';



const mockMessage = {

    wsConnected: true,
    orders: [
        {
            _id: '64ba476d82e277001bf91f05',
            ingredients: [
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Space флюоресцентный бургер',
            createdAt: '2023-07-21T08:53:01.704Z',
            updatedAt: '2023-07-21T08:53:01.823Z',
            number: 13551
        },
        {
            _id: '64ba476682e277001bf91f04',
            ingredients: [
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Space флюоресцентный бургер',
            createdAt: '2023-07-21T08:52:54.778Z',
            updatedAt: '2023-07-21T08:52:54.966Z',
            number: 13550
        },
        {
            _id: '64ba474082e277001bf91f03',
            ingredients: [
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Space флюоресцентный бургер',
            createdAt: '2023-07-21T08:52:16.113Z',
            updatedAt: '2023-07-21T08:52:16.247Z',
            number: 13549
        }
    ],
    total: 13177,
    totalToday: 113,
    error: ''
}

describe('Тест редьюсера wsProfileReducer', () => {
    test('Action WS_CONNECTION_ORDERS_START', () => {
        const expected = {
            ...initialState
        };
        const received = wsProfileReducer(initialState, {
            type: WS_CONNECTION_ORDERS_START,
            payload: 'wsurl'
        });
        expect(received).toEqual(expected)
    })

    test('Action WS_CONNECTION_ORDERS_SUCCESS', () => {
        const expected = {
            ...initialState,
            wsConnected: true,
        };
        const received = wsProfileReducer(initialState, {
            type: WS_CONNECTION_ORDERS_SUCCESS
        });
        expect(received).toEqual(expected)
    })

    test('Action WS_CONNECTION_ORDERS_ERROR', () => {
        const expected = {
            ...initialState,
            orders: [],
            total: 0,
            totalToday: 0,
            wsConnected: false,
            error: 'event'
        };
        const received = wsProfileReducer(initialState, {
            type: WS_CONNECTION_ORDERS_ERROR,
            payload: 'event'
        });
        expect(received).toEqual(expected)
    })

    test('Action WS_CONNECTION_ORDERS_CLOSED', () => {
        const expected = {
            ...initialState,
            orders: [],
            total: 0,
            totalToday: 0,
            wsConnected: false,
            error: 'event'
        };
        const received = wsProfileReducer(initialState, {
            type: WS_CONNECTION_ORDERS_CLOSED,
            payload: 'event'
        });
        expect(received).toEqual(expected)
    })

    test('Action WS_CONNECTION_ORDERS_END', () => {
        const expected = {
            ...initialState
        };
        const received = wsProfileReducer(initialState, {
            type: WS_CONNECTION_ORDERS_END
        });
        expect(received).toEqual(expected)
    })

    test('Action WS_GET_ORDERS_MESSAGE', () => {
        const expected = {
            ...initialState,
            orders: mockMessage.orders,
            total: mockMessage.total,
            totalToday: mockMessage.totalToday,
        };
        const received = wsProfileReducer(initialState, {
            type: WS_GET_ORDERS_MESSAGE,
            payload: mockMessage
        });
        expect(received).toEqual(expected)
    })


    test('Return InitialState', () => {
        const expected = {
            ...initialState
        };
        const received = wsProfileReducer(undefined, {} as TWsConnectionActions);
        expect(received).toEqual(expected)
    })

})