import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css'

const App = () => {
    return (
        <div className="wrapper">
            <AppHeader />
            <main className={appStyles.mainContainer}>
                <div className={appStyles.mainPanel}><BurgerIngredients /></div>
                <div className={appStyles.mainPanel}><BurgerConstructor /></div>
            </main>

        </div >
    )
}

export default App
