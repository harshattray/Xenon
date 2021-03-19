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

export interface insertVaultAfterAction {
	type: ActionType.INSERT_VAULT_AFTER;
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

export interface BundleStartAction {
	type: ActionType.BUNDLE_START;
	payload: {
		vaultId: string;
	};
}

export interface BundleCompleteAction {
	type: ActionType.BUNDLE_COMPLETE;
	payload: {
		vaultId: string;
		bundle: {
			code: string;
			err: string;
		};
	};
}

export type Action =
	| MoveVaultAction
	| DeleteVaultAction
	| insertVaultAfterAction
	| UpdateVaultAction
	| BundleStartAction
	| BundleCompleteAction;

export type Directions = "up" | "down";
