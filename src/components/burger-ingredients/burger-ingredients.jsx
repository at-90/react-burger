import { useState, useRef, useCallback, useContext } from 'react';
import { ProductsContext } from '../../services/productsContext.js';
import {
    Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from '../ingredients-list/ingredients-list.jsx';
import PropTypes from 'prop-types';
import { ingredientsTypes } from '../../constants/data-types.js';
import burgerIngredientsStyles from './burger-ingredients.module.css';


const BurgerIngredients = () => {

    const { ingredients: data } = useContext(ProductsContext)

    const buns = data.filter(elem => elem.type === 'bun');
    const sauces = data.filter(elem => elem.type === 'sauce');
    const fillings = data.filter(elem => elem.type === 'main');

    const [current, setCurrent] = useState('buns');

    const refBun = useRef();
    const refSauces = useRef();
    const refFillings = useRef();

    const scrollToSection = useCallback((e, refElem) => {
        setCurrent(e)
        refElem.current.scrollIntoView({
            behavior: 'smooth'
        })
    }, []);

    return (
        <>
            <article className={burgerIngredientsStyles.article}>
                <div className="pt-10 pb-5">
                    <h1 className="text text_type_main-large">Соберите бургер</h1>
                </div>
                <div className="tabsBar mb-10">
                    <Tab value="buns" active={current === 'buns'} onClick={(e) => { scrollToSection(e, refBun) }}>Булки</Tab>
                    <Tab value="sauces" active={current === 'sauces'} onClick={(e) => { scrollToSection(e, refSauces) }}>Соусы</Tab>
                    <Tab value="fillings" active={current === 'fillings'} onClick={(e) => { scrollToSection(e, refFillings) }}>Начинки</Tab>
                </div>
                <div className='scrollList'>
                    <section className="sectionIngredients" ref={refBun}>
                        <h2 className='text text_type_text-medium'>Булки</h2>
                        <IngredientsList ingredients={buns} />
                    </section>
                    <section className="sectionIngredients" ref={refSauces}>
                        <h2 className='text text_type_text-medium'>Соусы</h2>
                        <IngredientsList ingredients={sauces} />
                    </section>
                    <section className="sectionIngredients" ref={refFillings}>
                        <h2 className='text text_type_text-medium'>Начинки</h2>
                        <IngredientsList ingredients={fillings} />
                    </section>
                </div>
            </article >
        </>
    )
}


export default BurgerIngredients