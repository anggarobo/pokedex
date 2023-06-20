import { PokeItemUrl, PokeResultType } from "./pokemon";

export interface PokeItemVarieties {
    is_default: boolean
    pokemon: PokeResultType
}

export interface PokeItemFlavorTextEntry {
    flavor_text: string
    language: PokeResultType
    version: PokeResultType
}

export interface PokeItemSpecies {
    base_happiness: number
    capture_rate: number
    color: PokeResultType
    egg_groups: PokeResultType[]
    evolution_chain: PokeItemUrl
    evolves_from_species: unknown
    flavor_text_entries: PokeItemFlavorTextEntry[]
    form_descriptions: unknown[]
    forms_switchable: boolean
    gender_rate: number
    genera: unknown[]
    generation: PokeResultType
    habitat: PokeResultType
    growth_rate: PokeResultType
    varieties: PokeItemVarieties
    hatch_counter: number
    id: number
    has_gender_differences: boolean
    is_baby: boolean
    is_legendary: boolean
    is_mythical: boolean
    name: string
    order: number
    shape: unknown
    pokedex_numbers: unknown[]
    pal_park_encounters: unknown[]
    names: unknown[]
}