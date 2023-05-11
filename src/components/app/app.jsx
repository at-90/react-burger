import { useState, useEffect, useContext } from 'react';
import { ProductsContext } from '../../services/productsContext';
import ErrorBoundary from '../error/error-boundary';
import AppHeader from '../app-header/app-header';
import { API_INGREDIENTS } from '../../constants/api.js';
import { getDataResource } from '../../utils/getApiData.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css'

const App = () => {

    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(false);

    const getData = async function (url) {

        const result = await getDataResource(url);

        if (result) {

            const ingredientsList = result.map(elem => elem);
            setIngredients(ingredientsList);
            setError(false)

        }
        else {

            setError(true)
        }
    }

    useEffect(() => {
        getData(API_INGREDIENTS)
    }, [])

    return (
        <ErrorBoundary errorApp={error}>
            <ProductsContext.Provider value={{ ingredients, setIngredients }}>
                <div className="wrapper">
                    <AppHeader />
                    <main className={appStyles.mainContainer}>
                        <div className={appStyles.mainPanel}><BurgerIngredients data={ingredients} /></div>
                        <div className={appStyles.mainPanel}><BurgerConstructor data={ingredients} /></div>
                    </main>
                </div >
            </ProductsContext.Provider>
        </ErrorBoundary>
    )
}

export default App
