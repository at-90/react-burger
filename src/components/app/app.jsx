import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    const { itemsRequest, items } = useSelector(store => store.ingredients)

    useEffect(() => { dispatch(getApiIngredients()) }, [dispatch])

    return (

        <ErrorBoundary errorApp={false} >
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
        </ErrorBoundary>

    )
}

export default App
