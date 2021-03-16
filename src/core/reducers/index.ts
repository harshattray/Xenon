import vaultReducer from './vaultReducers';
import {combineReducers} from 'redux';

export const reducers =  combineReducers({
     vault: vaultReducer
});


export type RootState  = ReturnType<typeof reducers>