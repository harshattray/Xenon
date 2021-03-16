import { ActionType } from "../actiontypes";
import { Action } from "../actions";
import { Vault } from "../vault";

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

export const reducer = (
	state: VaultState = initialState,
	action: Action
): VaultState => {
	switch (action.type) {
		case ActionType.UPDATE_VAULT:
			const { id, content } = action.payload;
			return {
				...state,
				data: {
					...state.data,
					[id]: {
						...state.data[id],
						content: content,
					},
				},
			};
		case ActionType.DELETE_VAULT:
			return {
				...state,
			};
		case ActionType.INSERT_VAULT_BEFORE:
			return {
				...state,
			};
		case ActionType.MOVE_VAULT:
			return {
				...state,
			};

		default:
			return {
				...state,
			};
	}
};

export default reducer;
