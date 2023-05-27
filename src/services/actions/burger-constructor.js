import uuid from 'react-uuid';

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const CONSTRUCTOR_REMOVE_ITEM = 'CONSTRUCTOR_REMOVE_ITEM';
export const CONSTRUCTOR_UPDATE = 'CONSTRUCTOR_UPDATE';


export const addIngredient = (item) => {

    return (dispatch) => {
        if (item.type === 'bun') {
            dispatch({
                type: ADD_BUN,
                item: {
                    ...item,
                    dragId: uuid()
                }
            });
        } else {
            dispatch({
                type: ADD_INGREDIENT,
                item: {
                    ...item,
                    dragId: uuid(),
                }
            });
        }

    };
};


