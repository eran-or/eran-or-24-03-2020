import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import * as reducers from './reducers/'
import api from './middlwares/api'
import thunk from 'redux-thunk'

const middlewares = [thunk, api]
export default () => {
  const store = createStore(
    combineReducers({
      favorites: reducers.favoritesReducer,
      weather: reducers.weatherReducer
    }),
    compose(
      applyMiddleware(
        ...middlewares
      ),(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  );
  return store;
};