import { useEffect } from 'react';
import {  Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import ErrorBoundary from '../error/error-boundary';
import Preloader from '../preloader/preloader';
import AppHeader from '../app-header/app-header';
import { routesPrivate, routesPublic } from '../../routes/routes';
import { getApiIngredients } from '../../services/actions/burger-ingredients';
import {selectIngredients} from "../../services/selectors/selectors";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderCompositionPage from "../../pages/order-composition-page/order-composition-page";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {checkUserAuth} from "../../services/actions/user";

const App = () => {

    const dispatch = useAppDispatch();
    const { itemsRequest, items : ingredients } = useAppSelector(selectIngredients);

    const location = useLocation();
    const navigate = useNavigate();
    let background = location.state && location.state.background;

    useEffect(() => { dispatch(getApiIngredients()); dispatch(checkUserAuth()) }, [dispatch])

    const closeModal = () => { navigate(-1)};

    return (

            <ErrorBoundary errorApp={false} >
                {
                    itemsRequest && ingredients
                        ? <Preloader />
                        : <div className="wrapper">
                            <AppHeader />
                            <Routes location={background || location}>
                                {routesPublic.map(elem => <Route path={elem.path} element={elem.element} key={elem.path} />)}
                                {routesPrivate.map((elem) => {
                                    return (elem.hasOwnProperty('leftMenu')
                                        ?
                                        <Route path={elem.path} element={elem.element} key={elem.path} >
                                            {elem.leftMenu.map(item => <Route path={item.path} element={item.element} key={item.path} />)}
                                        </Route>
                                        : <Route path={elem.path} element={elem.element} key={elem.path} />
                                    )
                                })
                                }
                                currentIngredient &&
                                <Route path='/ingredients/:ingredientId' element={<IngredientDetails ingredients = {ingredients}/>} />
                                <Route
                                    path='/feed/:id'
                                    element={
                                            <OrderCompositionPage/>
                                    }
                                />
                                <Route
                                    path='/profile/orders/:id'
                                    element={
                                        <OrderCompositionPage/>
                                    }
                                />
                            </Routes>

                            {(background && ingredients) &&
                                <Routes>
                                    <Route
                                        path='/ingredients/:ingredientId'
                                        element={

                                            <Modal closeModal={closeModal}  title="Детали ингредиента">
                                                <IngredientDetails ingredients = {ingredients}/>
                                            </Modal>
                                        }
                                    />
                                    <Route
                                        path="/feed/:id"
                                        element={
                                            <Modal title="Детали заказа" closeModal={closeModal}>
                                                <OrderCompositionPage/>
                                            </Modal>
                                        }
                                    />
                                    <Route
                                        path='/profile/orders/:id'
                                        element={
                                            <Modal title="Детали заказа" closeModal={closeModal}>
                                                <OrderCompositionPage/>
                                            </Modal>
                                        }
                                    />

                                </Routes>
                            }
                        </div >
                }
            </ErrorBoundary>

    )
}

export default App
