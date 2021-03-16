import { ActionType } from "../actiontypes";
import {
	Action,
	MoveVaultAction,
	DeleteVaultAction,
	InsertVaultBefore,
	UpdateVaultAction,
    Directions
} from "../actions";
import { VaultTypes } from "../vault";



/**
 *
 * @param id
 * @returns
 */

export const deleteVault = (id: string): DeleteVaultAction => {
	return {
		type: ActionType.DELETE_VAULT,
		payload: id,
	};
};


/**
 * 
 * @param id 
 * @param vaultType 
 * @returns 
 */
export const insertBeforeVault = (
	id: string,
	vaultType: VaultTypes
): InsertVaultBefore => {
	return {
		type: ActionType.INSERT_VAULT_BEFORE,
		payload: {
			id,
			vaultType,
		},
	};
};

/**
 * 
 * @param id 
 * @param content 
 * @returns 
 */

export const updateVault = (
	id: string,
	content: string
): UpdateVaultAction  => {
	return {
		type: ActionType.UPDATE_VAULT,
		payload: {
			id,
			content,
		},
	};
};

export const moveVault = (
	id: string,
	direction: Directions
): MoveVaultAction => {
	return {
		type: ActionType.MOVE_VAULT,
		payload: {
			id,
			direction,
		},
	};
};
