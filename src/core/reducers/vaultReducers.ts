import { ActionType } from "../actiontypes";
import { Action } from "../actions";
import { Vault } from "../vault";
import { produce } from "immer";

interface VaultState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: Vault;
	};
}

const initialState: VaultState = {
	loading: false,
	error: null,
	order: [],
	data: {},
};

export const reducer = produce(
	(state: VaultState = initialState, action: Action): VaultState | void => {
		switch (action.type) {
			case ActionType.UPDATE_VAULT:
				const { id, content } = action.payload;
				state.data[id].content = content;
				return state;

			case ActionType.DELETE_VAULT:
				delete state.data[action.payload];
				state.order = state.order.filter((id) => id !== action.payload);
				return state;

			case ActionType.INSERT_VAULT_BEFORE:
				const generatedVault: Vault = {
					id: randomIdGenerator(),
					type: action.payload.vaultType,
					content: "",
				};
				//pushing it into the data object
				state.data[generatedVault.id] = generatedVault;
				//updating the order array
				const currentIndex = state.order.findIndex(
					(id) => id === action.payload.id
				);
				if (currentIndex < 0) {
					state.order.push(generatedVault.id);
				} else {
					//insert the new vault at the generatedIndex
					state.order.splice(currentIndex, 0, generatedVault.id);
				}
				return state;

			case ActionType.MOVE_VAULT:
				const { direction } = action.payload;
				const index = state.order.findIndex((id) => id === action.payload.id);
				const targetIndex = direction === "up" ? index - 1 : index + 1;
				if (targetIndex < 0 || targetIndex > state.order.length - 1) {
					return state;
				}
				state.order[index] = state.order[targetIndex];
				state.order[targetIndex] = action.payload.id;
				return state;

			default:
				return state;
		}
	},initialState);

const randomIdGenerator = () => {
	return Math.random().toString(36).substr(2, 5);
};
export default reducer;

/**
 *  Traditional pre-Immer State update that I Like
 * 			return {
				...state,
				data: {
					...state.data,
					[id]: {
						...state.data[id],
						content: content,
					},
				},
			};
 */
