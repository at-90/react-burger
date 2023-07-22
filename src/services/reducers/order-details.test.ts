import {
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAILED,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_RESET,
    TOrderDetailsActions,
    CURRENT_ORDER_DETAILS_SUCCESS,
} from "../actions/order-details";
import { orderState, orderReducer } from "./order-details";

const mockOrder = {
    success: true,
    name: 'Space флюоресцентный бургер',
    order: {
        ingredients: [
            {
                _id: '643d69a5c3f7b9001cfa093d',
                name: 'Флюоресцентная булка R2-D3',
                type: 'bun',
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
                __v: 0
            },
            {
                _id: '643d69a5c3f7b9001cfa093d',
                name: 'Флюоресцентная булка R2-D3',
                type: 'bun',
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
                __v: 0
            },
            {
                _id: '643d69a5c3f7b9001cfa0943',
                name: 'Соус фирменный Space Sauce',
                type: 'sauce',
                proteins: 50,
                fat: 22,
                carbohydrates: 11,
                calories: 14,
                price: 80,
                image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
                __v: 0
            }
        ],
        _id: '64ba1c1982e277001bf91b5d',
        owner: {
            name: 'AX',
            email: 'alex.timofeiev@yandex.ru',
            createdAt: '2023-06-10T13:38:27.793Z',
            updatedAt: '2023-07-15T16:45:56.945Z'
        },
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2023-07-21T05:48:09.330Z',
        updatedAt: '2023-07-21T05:48:09.440Z',
        number: 13533,
        price: 2056
    },
    currentOrder: {
        _id: '64b9fb7682e277001bf91b1e',
        ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943'
        ],
        owner: '64a4bac112f4a2001bd5ba49',
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2023-07-21T03:28:54.597Z',
        updatedAt: '2023-07-21T03:28:54.724Z',
        number: 13532,
        __v: 0
    }
}

describe('Тест редьюсера orderReducer', () => {

    test('Action ORDER_DETAILS_REQUEST', () => {
        const expected = {
            ...orderState,
            isLoading: true,
        };
        const received = orderReducer(orderState, {
            type: ORDER_DETAILS_REQUEST
        });
        expect(received).toEqual(expected)
    })

    test('Action ORDER_DETAILS_SUCCESS', () => {
        const expected = {
            ...orderState,
            isLoading: false,
            hasError: false,
            order: mockOrder,
        };
        const received = orderReducer(orderState, {
            type: ORDER_DETAILS_SUCCESS,
            order: mockOrder,
        });
        expect(received).toEqual(expected)
    })

    test('Action CURRENT_ORDER_DETAILS_SUCCESS', () => {
        const expected = {
            ...orderState,
            isLoading: false,
            hasError: false,
            currentOrder: mockOrder.currentOrder,
        };
        const received = orderReducer(orderState, {
            type: CURRENT_ORDER_DETAILS_SUCCESS,
            currentOrder: mockOrder.currentOrder,
        });
        expect(received).toEqual(expected)
    })

    test('Action ORDER_DETAILS_FAILED', () => {
        const expected = {
            ...orderState,
            isLoading: false,
            hasError: true,
        };
        const received = orderReducer(orderState, {
            type: ORDER_DETAILS_FAILED
        });
        expect(received).toEqual(expected)
    })

    test('Action ORDER_DETAILS_RESET', () => {
        const expected = {
            ...orderState,
            order: null,
            isLoading: false,
            hasError: false
        };
        const received = orderReducer(orderState, {
            type: ORDER_DETAILS_RESET
        });
        expect(received).toEqual(expected)
    })

    test('Return InitialState', () => {
        const expected = {
            ...orderState
        };
        const received = orderReducer(undefined, {} as TOrderDetailsActions);
        expect(received).toEqual(expected)
    })
})
