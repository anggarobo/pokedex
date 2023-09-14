import { POKEMON } from "~/constants/pokemon";
import useQueryString from "./useQueryString";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { http } from "../http";
import { PokeItem } from "~/types/pokemon";

export default function usePokeSearch() {
    const { getQuery } = useQueryString()
    const { mutate } = useSWRConfig()
    const keyword = getQuery(POKEMON)
    const [pokemons, setPokemons] = useState<PokeItem[]>([])

    const search = async (poke: string) => {
        const endpoint = `/pokemon/${poke}`
        try {
        if (poke) {
            await mutate(endpoint, () => http<PokeItem>(endpoint))
            .then(pokes => {
                if (pokes) setPokemons([pokes])
            })
        }
        } catch (error) {
        console.error(error)
        }
    }

    useEffect(() => {
        if (!keyword) setPokemons([])
        if (keyword) search(keyword.toLowerCase())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword])

    return pokemons
}