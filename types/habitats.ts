import { PokeResultType } from "./pokemon";

interface PokeItemHabitatName {
    language: PokeResultType
    name: string
}

export interface PokeHabitat {
    id: number
    name: string
    names: PokeItemHabitatName[]
    pokemon_species: PokeResultType[]
}