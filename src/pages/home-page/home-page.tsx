import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';


const HomePage = () => {
    return <main className="mainContainer">
        <DndProvider backend={HTML5Backend}>
            <div className="mainPanel"><BurgerIngredients /></div>
            <div className="mainPanel"><BurgerConstructor /></div>
        </DndProvider >
    </main >
}

export default HomePage
