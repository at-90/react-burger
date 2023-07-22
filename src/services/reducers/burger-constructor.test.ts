import { TIngredient } from "../../constants/types";
import {
    ADD_INGREDIENT, ADD_BUN, CONSTRUCTOR_REMOVE_ITEM, CONSTRUCTOR_UPDATE, CONSTRUCTOR_TOTALSUM, CONSTRUCTOR_RESET,
    TBurgerConstructorActions
} from "../actions/burger-constructor";

import { constructorState, constructorReducer } from './burger-constructor'

const mockBun = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    qty: 0,
    dragId: '01423829-5053-16e4-bd26-32bad7d8a58c'
}

const mockIngredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0,
    qty: 0,
    dragId: 'da2e08d0-ae08-9c9b-e72c-98f526476e67'
}



describe('Тест редьюсера constructorReducer', () => {
    test('Action ADD_INGREDIENT', () => {
        const expected = {
            ...constructorState,
            components: [...constructorState.components, mockIngredient]
        };
        const received = constructorReducer(constructorState, {
            type: ADD_INGREDIENT,
            item: mockIngredient
        });
        expect(received).toEqual(expected)
    })

    test('Action ADD_BUN', () => {
        const expected = {
            ...constructorState,
            buns: [...constructorState.components, mockBun]
        };
        const received = constructorReducer(constructorState, {
            type: ADD_BUN,
            item: mockBun
        });
        expect(received).toEqual(expected)
    })

    test('Action CONSTRUCTOR_REMOVE_ITEM', () => {
        const expected = {
            ...constructorState,
            components: constructorState.components.filter((elem: TIngredient) => elem.dragId !== 'da2e08d0-ae08-9c9b-e72c-98f526476e67')
        };
        const received = constructorReducer(constructorState, {
            type: CONSTRUCTOR_REMOVE_ITEM,
            dragId: mockIngredient.dragId
        });
        expect(received).toEqual(expected)
    })

    test('Action CONSTRUCTOR_UPDATE', () => {
        const expected = {
            ...constructorState,
            components: [mockIngredient, mockBun]
        };
        const received = constructorReducer(constructorState, {
            type: CONSTRUCTOR_UPDATE,
            components: [mockIngredient, mockBun]
        });
        expect(received).toEqual(expected)
    })

    test('Action CONSTRUCTOR_TOTALSUM', () => {
        const expected = {
            ...constructorState,
            totalSum: 152
        };
        const received = constructorReducer(constructorState, {
            type: CONSTRUCTOR_TOTALSUM,
            totalSum: 152
        });
        expect(received).toEqual(expected)
    })

    test('Action CONSTRUCTOR_RESET', () => {
        const expected = {
            ...constructorState
        };
        const received = constructorReducer(constructorState, {
            type: CONSTRUCTOR_RESET
        });
        expect(received).toEqual(expected)
    })

    test('Return InitialState', () => {
        const expected = {
            ...constructorState
        };
        const received = constructorReducer(undefined, {} as TBurgerConstructorActions);
        expect(received).toEqual(expected)
    })

})