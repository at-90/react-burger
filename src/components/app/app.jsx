import { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TotalSumContext } from '../../services/productsContext';
import ErrorBoundary from '../error/error-boundary';
import Preloader from '../preloader/preloader';
import AppHeader from '../app-header/app-header';
import { getApiIngredients } from '../../services/actions/burger-ingredients';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';

const App = () => {

    const dispatch = useDispatch();

    const totalSumInitial = { sum: 0 };
    const reducer = (state, action) => {
        if (action.type === 'calculate') return { sum: action.payload }
        if (action.type === 'reset') return { sum: totalSumInitial }
        return state
    }
    const [totalSum, totalSumDispatcher] = useReducer(reducer, totalSumInitial)
    const { itemsRequest, items } = useSelector(store => store.ingredients)

    useEffect(() => { dispatch(getApiIngredients()) }, [dispatch])

    return (

        <ErrorBoundary errorApp={false} >
            <TotalSumContext.Provider value={{ totalSum, totalSumDispatcher }}>
                {
                    itemsRequest && items
                        ? <Preloader />
                        : <div className="wrapper">
                            <AppHeader />
                            <main className={appStyles.mainContainer}>
                                <DndProvider backend={HTML5Backend}>
                                    <div className={appStyles.mainPanel}><BurgerIngredients /></div>
                                    <div className={appStyles.mainPanel}><BurgerConstructor /></div>
                                </DndProvider>
                            </main>
                        </div >
                }
            </TotalSumContext.Provider>
        </ErrorBoundary>

    )
}

export default App
