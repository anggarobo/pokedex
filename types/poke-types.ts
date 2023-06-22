import { PokeResultType } from "./pokemon"

interface PokemonItemPokeTypes {
    slot: number
    pokemon: PokeResultType
}

export interface PokeTypesItem {
    id: number
    genereation: PokeResultType
    move_damage_class: PokeResultType
    name: string
    pokemon: PokemonItemPokeTypes[]
}