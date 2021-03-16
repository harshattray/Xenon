import { ActionType } from "../actiontypes";
import { VaultTypes } from "../vault";

export interface MoveVaultAction {
	type: ActionType.MOVE_VAULT;
	payload: {
		id: string;
		direction: Directions;
	};
}

export interface DeleteVaultAction {
	type: ActionType.DELETE_VAULT;
	payload: string;
}

export interface InsertVaultBefore {
	type: ActionType.INSERT_VAULT_BEFORE;
	payload: {
		id: string | null;
		vaultType: VaultTypes;
	};
}

export interface UpdateVaultAction {
	type: ActionType.UPDATE_VAULT;
	payload: {
		id: string;
		content: string;
	};
}

export type Action =
	| MoveVaultAction
	| DeleteVaultAction
	| InsertVaultBefore
	| UpdateVaultAction;

export type Directions  = 'up' | 'down'