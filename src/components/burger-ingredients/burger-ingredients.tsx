import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from '../ingredients-list/ingredients-list';
import {selectIngredients} from "../../services/selectors/selectors";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { useInView } from "framer-motion";
import {TDragIngredient} from "../../constants/types";

const BurgerIngredients = () => {


    const { items } = useAppSelector(selectIngredients);


    const buns = useMemo(() => { return items.filter((elem: TDragIngredient) => elem.type === 'bun'); }, [items])
    const sauces = useMemo(() => { return items.filter((elem: TDragIngredient) => elem.type === 'sauce'); }, [items])
    const fillings = useMemo(() => { return items.filter((elem: TDragIngredient) => elem.type === 'main'); }, [items])

    const [current, setCurrent] = useState('buns');

    const scrollListRef  = useRef<HTMLDivElement >(null);
    const refBuns = useRef<HTMLElement>(null);
    const refSauces = useRef<HTMLElement>(null);
    const refFillings = useRef<HTMLElement>(null);

    const inViewBuns = useInView(refBuns, {  root: scrollListRef })
    const inViewSauces = useInView(refSauces, {  amount: 0.25, margin: '-150px', root: scrollListRef, })
    const inViewFillings = useInView(refFillings, { amount: 0.45, root: scrollListRef, })


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



    const scrollToSection = useCallback((e: string, refElem : React.RefObject<HTMLElement>  ) => {
        setCurrent(e)
        if(refElem.current !== null){
            refElem.current?.scrollIntoView({
                behavior: 'smooth'
            })
        }
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