import { ActionType } from "../actiontypes";
import {
	MoveVaultAction,
	DeleteVaultAction,
	insertVaultAfterAction,
	UpdateVaultAction,
	Directions,
	Action,
} from "../actions";
import { VaultTypes } from "../vault";
import bundle from "../../bundler";
import { Dispatch } from "redux";

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
export const insertVaultAfter = (
	id: string | null,
	vaultType: VaultTypes
): insertVaultAfterAction => {
	return {
		type: ActionType.INSERT_VAULT_AFTER,
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

export const updateVault = (id: string, content: string): UpdateVaultAction => {
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

export const createBundle = (vaultId: string, input: string) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
			payload: {
				vaultId: vaultId,
			},
		});
		const result = await bundle(input);

		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				vaultId: vaultId,
				bundle: {
					code: result.code,
					err: result.err
				}
			}
		})
	};
};
