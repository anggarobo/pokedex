import { EvoPropsChainType } from "~/types/evo-chain"
import { PokeResultType } from "~/types/pokemon"

export const capitalize = (str: string) => {
    return str?.split(' ').map(s => s?.[0]?.toUpperCase()+s.slice(1)).join(' ')
}

export const evoline = (lines?: EvoPropsChainType[]): PokeResultType[] => {
        const chain: PokeResultType[] = []
        if (lines && lines.length > 0) {
            lines.forEach(poke => {
                chain.push({ name: poke.species.name } as PokeResultType)
                if (poke?.evolves_to) {
                    chain.push(...evoline(poke.evolves_to))
                }
            })
        }
        return chain
    }