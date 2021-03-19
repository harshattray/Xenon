import {combineReducers} from 'redux';
import vaultReducer from './vaultReducers';
import bundleReducer from './bundlesReducers';

export const reducers =  combineReducers({
     vault: vaultReducer,
     bundle: bundleReducer,
});


export type RootState  = ReturnType<typeof reducers>