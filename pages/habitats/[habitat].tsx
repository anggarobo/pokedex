import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import Card from "~/components/card";
import CardLoader from "~/components/card/skeleton";
import Layout from "~/components/layout";
import Tab from "~/components/tab";
import PokeTabs from '~/components/tab/poketabs';
import { PokeHabitat } from "~/types/habitats";
import { http } from "~/utils/http";

function Habitat() {
    const { asPath } = useRouter()
    const [, habitat] = asPath?.slice(1)?.split('/')
    const { data, isLoading } = useSWR<PokeHabitat>(`/pokemon-habitat/${habitat ?? 'cave'}`, http as Fetcher<PokeHabitat>)

    return (
        <Layout>
            <div className="flex flex-col gap-4 justify-center">
                <div className="self-center">
                    <Tab />
                </div>
                <PokeTabs />
            </div>
            <div className="flex flex-wrap gap-8 justify-evenly">
                {isLoading && ((new Array(6).map((_, i) => (<CardLoader key={i} />))))}
                {data?.pokemon_species && data.pokemon_species.map(species => (
                    <Card key={species.url} name={species.name} />
                ))}
            </div>
        </Layout>
    );
}

export default Habitat;