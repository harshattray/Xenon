import { ActionType } from "../actiontypes";
import produce from "immer";
import { Action } from "../actions";

interface BundlesState {
	[key: string]: {
		loading: boolean;
		code: string;
		error: string;
	} | undefined;
}

const initialState:BundlesState = {}


 export const reducer = produce((state:BundlesState = initialState, action: Action):BundlesState =>{
     switch(action.type){
         case ActionType.BUNDLE_START:
             state[action.payload.vaultId] = {
                 loading:true,
                 code:'',
                 error:''
             }
             return state;
         case ActionType.BUNDLE_COMPLETE:
             state[action.payload.vaultId] = {
                 loading:false,
                 code: action.payload.bundle.code,
                 error: action.payload.bundle.err
             }
             return state;
        default:
            return state;
     }
 },initialState)

 export default reducer;