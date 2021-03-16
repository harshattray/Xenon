export type VaultTypes = 'code' | 'markdown'

export interface Vault {
    id: string;
    type: VaultTypes;
    content: string
}