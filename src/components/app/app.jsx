import { useState, useEffect, useReducer } from 'react';
import { IngredientsContext, TotalSumContext } from '../../services/productsContext';
import ErrorBoundary from '../error/error-boundary';
import Preloader from '../preloader/preloader';
import AppHeader from '../app-header/app-header';
import { API_INGREDIENTS } from '../../constants/api.js';
import { request } from '../../utils/getApiData.js';
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
    const [error, setError] = useState({ hasError: false, message: '' });
    const [isLoaded, setIsloaded] = useState(false);


    const getData = (url) => { return request(url) }

    useEffect(() => {

        getData(API_INGREDIENTS)
            .then((result) => {
                if (result.success) {
                    setIngredients(result.data);
                    setIsloaded(true);
                    setError({ hasError: false, message: '' })
                }
            })
            .catch((err) => {
                setIsloaded(false);
                setError({ hasError: true, message: err.message })
            })

    }, [])

    return (
        <ErrorBoundary errorApp={error.hasError} errorMessage={error.message}>
            <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
                <TotalSumContext.Provider value={{ totalSum, totalSumDispatcher }}>
                    {
                        isLoaded
                            ? <div className="wrapper">
                                <AppHeader />
                                <main className={appStyles.mainContainer}>
                                    <div className={appStyles.mainPanel}><BurgerIngredients /></div>
                                    <div className={appStyles.mainPanel}><BurgerConstructor setError={setError} /></div>
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
