import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import Card from "~/components/card";
import CardLoader from "~/components/card/skeleton";
import Layout from "~/components/layout";
import Tab from "~/components/tab";
import PokeTabs from "~/components/tab/poketabs";
import { PokeTypesItem } from "~/types/poke-types";
import { capitalize } from "~/utils/common";
import { http } from "~/utils/http";

function PokeType() {
    const { asPath } = useRouter()
    const [, pokeType] = asPath?.slice(1)?.split('/')
    const { data, isLoading } = useSWR<PokeTypesItem>(`/type/${pokeType ?? 'normal'}`, http as Fetcher<PokeTypesItem>)

    return (
        <Layout>
            <div className="w-full flex flex-col gap-4 justify-center">
                <Tab />
                <PokeTabs endpoint="type" />
            </div>
            <div>
                <h1 className="text-3xl font-medium">{capitalize(pokeType ?? "normal")}</h1>
            </div>
            <div className="flex flex-wrap gap-8 justify-evenly">
                {isLoading && ((new Array(6).map((_, i) => (<CardLoader key={i} />))))}
                {data?.pokemon && data.pokemon.map(poke => (
                    <Card key={poke.pokemon.url} name={poke.pokemon.name} />
                ))}
            </div>
        </Layout>
    );
}

export default PokeType;