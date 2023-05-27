import { useState, useRef, useCallback, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from '../ingredients-list/ingredients-list.jsx';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { useInView } from "framer-motion";

const BurgerIngredients = () => {



    const { items } = useSelector(store => store.ingredients);

    const buns = items.filter(elem => elem.type === 'bun');
    const sauces = items.filter(elem => elem.type === 'sauce');
    const fillings = items.filter(elem => elem.type === 'main');

    const [current, setCurrent] = useState('buns');

    const scrollListRef = useRef()
    const refBuns = useRef();
    const refSauces = useRef();
    const refFillings = useRef();

    const inViewBuns = useInView(refBuns, { threshold: 0, root: scrollListRef })
    const inViewSauces = useInView(refSauces, { threshold: 1, amount: 0.25, margin: '-150px', root: scrollListRef, })
    const inViewFillings = useInView(refFillings, { threshold: 0.75, amount: 0.45, root: scrollListRef, })


    useEffect(() => {
        if (inViewBuns) {
            setCurrent('buns');
        }
        if (inViewSauces) {
            setCurrent('sauces');
        }
        if (inViewFillings) {
            setCurrent('fillings');
        }
    }, [inViewBuns, inViewSauces, inViewFillings]);



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
                    <Tab value="buns" active={current === 'buns'} onClick={(e) => { scrollToSection(e, refBuns) }}>Булки</Tab>
                    <Tab value="sauces" active={current === 'sauces'} onClick={(e) => { scrollToSection(e, refSauces) }}>Соусы</Tab>
                    <Tab value="fillings" active={current === 'fillings'} onClick={(e) => { scrollToSection(e, refFillings) }}>Начинки</Tab>
                </div>
                <div ref={scrollListRef} className='scrollList'>
                    <section ref={refBuns} className="sectionIngredients"  >
                        <h2 className='text text_type_text-medium'>Булки</h2>
                        <IngredientsList ingredients={buns} />
                    </section>
                    <section ref={refSauces} className="sectionIngredients" >
                        <h2 className='text text_type_text-medium'>Соусы</h2>
                        <IngredientsList ingredients={sauces} />
                    </section>
                    <section ref={refFillings} className="sectionIngredients"  >
                        <h2 className='text text_type_text-medium'>Начинки</h2>
                        <IngredientsList ingredients={fillings} />
                    </section>
                </div>
            </article >
        </>
    )
}


export default BurgerIngredients