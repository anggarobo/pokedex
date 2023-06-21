export interface PokeItemUrl {
    url: string
}

export interface PokeResultType extends PokeItemUrl {
    name?: string
}

export interface PokeItemTypes {
    slot: number
    type: PokeResultType
}

export interface PokeItemStats {
    base_stat: number
    effort: number
    stat: PokeResultType
}

export interface PokeFront {
    front_default: string
    front_shiny?: string
}

export interface PokeBack {
    back_default: string
    back_shiny?: string
}

export interface PokeItemSpritesOther {
    dream_world: PokeFront
    home: PokeFront
    "official-artwork": PokeFront

}

export interface PokeItemSprites extends PokeFront, PokeBack {
    other: PokeItemSpritesOther
    version: unknown
}

export interface PokeItemMove {
    move: PokeResultType
    version_group_details: unknown
}

export interface PokeItemGameIndices {
    game_index: number
    version: PokeResultType
}

export interface PokeItemAbilities {
    ability: PokeResultType
    is_hidden: boolean
    slot: number
}

export interface PokeItem {
    abilities: PokeItemAbilities[],
    base_experience: number
    forms: PokeResultType[]
    game_indices: PokeItemGameIndices[]
    height: number
    held_items: []
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: PokeItemMove[]
    name: string
    order: number
    past_types: []
    species: PokeResultType
    sprites: PokeItemSprites
    stats: PokeItemStats[]
    types: PokeItemTypes[]
    weight: number
}