import { INGREDIENT_DETAILS_SET, TIngredientsDetails } from "../actions/ingredients-details";
import { currentIngredientState, currentIngredientReducer } from './ingredients-details';

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


test('Action INGREDIENT_DETAILS_SET', () => {
    const expected = {
        ...mockIngredient
    };
    const received = currentIngredientReducer(currentIngredientState, {
        type: INGREDIENT_DETAILS_SET,
        item: mockIngredient
    });
    expect(received).toEqual(expected)
})

test('Return InitialState', () => {
    const expected = {
        ...currentIngredientState
    };
    const received = currentIngredientReducer(undefined, {} as TIngredientsDetails);
    expect(received).toEqual(expected)
})
