import { useState, useEffect, useReducer } from 'react';
import { IngredientsContext, TotalSumContext } from '../../services/productsContext';
import ErrorBoundary from '../error/error-boundary';
import Preloader from '../preloader/preloader';
import AppHeader from '../app-header/app-header';
import { API_INGREDIENTS } from '../../constants/api.js';
import { getDataResource } from '../../utils/getApiData.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css'

const App = () => {

    const totalSumInitial = { sum: 0 };
    const reducer = (state, action) => {
        if (action.type === 'calculate') return { sum: action.payload }
        if (action.type === 'reset') return { sum: totalSumInitial }
        return state
    }
    const [totalSum, totalSumDispatcher] = useReducer(reducer, totalSumInitial)

    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(false);
    const [isLoaded, setIsloaded] = useState(false);


    const getData = async function (url) {

        const result = await getDataResource(url);

        if (result) {

            const ingredientsList = result.map(elem => elem);
            setIngredients(ingredientsList);
            setError(false);
            setIsloaded(true)
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
            <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
                <TotalSumContext.Provider value={{ totalSum, totalSumDispatcher }}>
                    {
                        isLoaded
                            ? <div className="wrapper">
                                <AppHeader />
                                <main className={appStyles.mainContainer}>
                                    <div className={appStyles.mainPanel}><BurgerIngredients data={ingredients} /></div>
                                    <div className={appStyles.mainPanel}><BurgerConstructor data={ingredients} /></div>
                                </main>
                            </div >
                            : <Preloader />
                    }

                </TotalSumContext.Provider>
            </IngredientsContext.Provider>
        </ErrorBoundary>
    )
}

export default App
