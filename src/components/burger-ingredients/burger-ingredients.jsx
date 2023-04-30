import data from '../../utils/data.js'
import {
    Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from '../ingredients-list/ingredients-list.jsx';
import burgerIngredientsStyles from './burger-ingredients.module.css';



const BurgerIngredients = props => {

    const buns = data.filter(elem => elem.type === 'bun');
    const sauces = data.filter(elem => elem.type === 'sauce');

    return (
        <article className={burgerIngredientsStyles.article}>
            <div className="pt-10 pb-5">
                <h1 className="text text_type_main-large">Соберите бургер</h1>
            </div>
            <div className="tabsBar mb-10">
                <Tab active>Булки</Tab>
                <Tab>Соусы</Tab>
                <Tab>Булки</Tab>
            </div>
            <div className='scrollList'>
                <section className="sectionIngredients">
                    <h2 className='text text_type_text-medium'>Булки</h2>
                    <IngredientsList ingredients={buns} />
                </section>
                <section className="sectionIngredients">
                    <h2 className='text text_type_text-medium'>Соусы</h2>
                    <IngredientsList ingredients={sauces} />
                </section>
            </div>
        </article >
    )
}

export default BurgerIngredients