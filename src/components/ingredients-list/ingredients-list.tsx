import React from "react";
import Card from '../card/card';
import { useMemo } from 'react';

import styles from './ingredients-list.module.css';
import { useSelector } from 'react-redux';
import {selectComponents, selectBuns} from "../../services/selectors/selectors";

type TFullIngredient = {
    _id:string;
    type: string;
    name: string;
    price: number;
    image: string;
    image_large: string;
    image_mobile: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fat: number;
    dragId: number;

}

type TIngredients = {
    ingredients: Array<TFullIngredient>;
}

const IngredientsList : React.FC<TIngredients>= ({ ingredients }) => {

    const components: Array<TFullIngredient> = useSelector(selectComponents);
    const buns = useSelector(selectBuns);

    const ingredientsCounts = useMemo(() => {
        let counts: any = {};
        buns.length && (counts[buns[0]._id] = 2)
        components.forEach(elem => {
            let count = counts[elem._id] ?? 0;
            counts[elem._id] = 1 * ++count;
        })
        return counts
    }, [buns, components])


    return (

        <ul className={[styles.container, 'pt-6 pb-10'].join(' ')}>

            {
                ingredients.map((elem: TFullIngredient ) => {
                    const { _id } = elem
                    return (
                        <li className="ingredient" key={_id} >
                            <Card data={elem} count={ingredientsCounts[_id]} />
                        </li>
                    )
                })
            }

        </ul>

    )
}


export default IngredientsList