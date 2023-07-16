import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import thunk,{ThunkAction} from 'redux-thunk';
import {socketMiddleware} from "./services/middleware/socket-middleware";

import {wsUrl} from "./constants/api";
import {TApplicationActions} from "./constants/types";
import {wsActions, wsOrderActions} from "./services/actions/ws";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk,socketMiddleware(wsActions, wsUrl),socketMiddleware(wsOrderActions,wsUrl)));

const store = createStore(rootReducer, enhancer);



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(

  <Provider store={store}>
      <BrowserRouter>
            <App />
      </BrowserRouter>
  </Provider>

);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
