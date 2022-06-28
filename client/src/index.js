import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {createStore ,applyMiddleware } from 'redux';
import store ,{persistor} from './redux/store';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {Provider } from 'react-redux';
import reducer from './redux/reducer'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {PersistGate} from 'redux-persist/integration/react'
//import {persistStore,persistReducer} from 'redux-persist'
//import storage from 'redux-persist/lib/storage'
//const appStore = createStore(reducer, applyMiddleware(thunk))
// const persistConfig = {
//   key:'main-root',
//   storage
// }

//const persistedReducer = persistReducer(persistConfig,reducer)

// const appStore = createStore(reducer,composeWithDevTools(
//   applyMiddleware()
//   // other store enhancers if any
// ));







ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <PersistGate persistor = {persistor} >
    <App />
    </PersistGate>
    </MuiPickersUtilsProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
