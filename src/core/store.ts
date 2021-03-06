import {createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import {reducers} from './reducers';
import {ActionType} from './actiontypes'


// createStore takes 3 arguments ( reducers, initial state, Middleware)
export const store = createStore(reducers,{}, applyMiddleware(thunk))

const state = store.getState();