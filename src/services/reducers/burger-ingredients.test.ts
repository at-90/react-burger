import {
    GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED,
    TBurgerIngredientsActions
} from '../actions/burger-ingredients';

import { ingredientsState, ingredientsReducer } from './burger-ingredients'

const mockIngredient = {
    "_id": "643d69a5c3f7b9001cfa093f",
    "name": "Мясо бессмертных моллюсков Protostomia",
    "type": "main",
    "proteins": 433,
    "fat": 244,
    "carbohydrates": 33,
    "calories": 420,
    "price": 1337,
    "image": "https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v": 0
}

describe('Тест редьюсера ingredientsReducer', () => {
    test('Action GET_ITEMS_REQUEST', () => {
        const expected = {
            ...ingredientsState,
            itemsRequest: true,
            itemsFailed: false,
        };
        const received = ingredientsReducer(ingredientsState, {
            type: GET_ITEMS_REQUEST
        });
        expect(received).toEqual(expected)
    })

    test('Action GET_ITEMS_SUCCESS', () => {
        const expected = {
            ...ingredientsState,
            items: [mockIngredient]
        };
        const received = ingredientsReducer(ingredientsState, {
            type: GET_ITEMS_SUCCESS,
            items: [mockIngredient]
        });
        expect(received).toEqual(expected)
    })

    test('Action GET_ITEMS_FAILED', () => {
        const expected = {
            ...ingredientsState,
            itemsRequest: false,
            itemsFailed: true,
        };
        const received = ingredientsReducer(ingredientsState, {
            type: GET_ITEMS_FAILED
        });
        expect(received).toEqual(expected)
    })

    test('Return InitialState', () => {
        const expected = {
            ...ingredientsState
        };
        const received = ingredientsReducer(undefined, {} as TBurgerIngredientsActions);
        expect(received).toEqual(expected)
    })

})