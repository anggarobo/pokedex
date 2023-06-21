import { PokeResultType } from "./pokemon"

type EvoDetailType = unknown[] 

export interface EvoPropsChainType {
    evolution_details: EvoDetailType
    evolves_to: EvoPropsChainType[]
    is_baby: boolean
    species: PokeResultType
}
export interface EvoChainType {
    baby_trigger_item?: unknown,
    chain: EvoPropsChainType,
    id: number
}