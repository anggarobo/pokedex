import Image from "next/image";
import useSWR, { Fetcher } from 'swr'
import { useRouter } from "next/router";
import Layout from "~/components/layout";
import { capitalize, evoline } from "~/utils/common";
import { http } from "~/utils/http";
import { PokeItem, PokeItemUrl, PokeResultType } from "~/types/pokemon";
import React from "react";
import { pokeTypes } from "~/constants/pokemon";
import { PokeItemSpecies } from "~/types/species";
import { EvoChainType, EvoPropsChainType } from "~/types/evo-chain";
import Link from "next/link";
import Card from "~/components/card";
import ChevronRight from "~/components/icons/chevronRight";

const flag = '/pokemon'

function Pokemon() {
    const { asPath } = useRouter()
    const [imgLoaded, setImgLoaded] = React.useState(false)
    const pokename = asPath?.slice(1)?.split('/')?.[0]
    const { data, isLoading } = useSWR<PokeItem>(`${flag}/${pokename}`, http as Fetcher<PokeItem>)
    const { data: species } = useSWR<PokeItemSpecies>(data?.species?.url, http as Fetcher<PokeItemSpecies>)
    const { data: evochain } = useSWR<EvoChainType>(species?.evolution_chain.url, http as Fetcher<EvoChainType>)

    const imgUrl = data?.sprites.other.dream_world.front_default ?? ""
    const briefDesc = species?.form_descriptions?.[0]?.description ?? species?.flavor_text_entries?.[0].flavor_text
    const breadcrumbs = ["pokedex", ...asPath?.slice(1).split('/')]    
    const evolves = [{ name: evochain?.chain.species.name }, ...evoline(evochain?.chain.evolves_to)]

    const onImgCompleted = () => setImgLoaded(true)

    return (
        <Layout>
            <div className="navbar bg-base-100 rounded-xl shadow-xl px-6">
                <div className="text-sm breadcrumbs">
                    <ul>
                        {breadcrumbs.map((b, i) => {
                            if (i + 1 === breadcrumbs.length) {
                                return <li key={i}>{capitalize(b)}</li>
                            }

                            return <li key={i}><Link href="/">{capitalize(b)}</Link></li>
                        })}
                    </ul>
                </div>
            </div>

            <div className="card lg:card-side bg-base-100 shadow-xl w-full">
                <figure className='z-10 h-80 w-80 cursor-pointer p-4 relative'>
                    {(imgUrl && !isLoading) ? (
                        <Image src={imgUrl} loading="lazy" alt='pokemon' onLoadingComplete={onImgCompleted} width={1} height={1} className={[imgLoaded ? 'scale-100 p-8' : 'scale-125 blur-2xl'].join(' ')} />
                    ) : (
                        <div className="animate-pulse flex space-x-4 w-full">
                            <div className="rounded-lg bg-slate-200 h-96 w-14"></div>
                        </div>
                    )}
                </figure>
                <div className="card-body">
                    <h1 className="card-title text-4xl">
                        {capitalize(pokename)}
                    </h1>
                    <div className="flex gap-2 mb-2">
                        {data?.types && data.types.map(t => (
                            <div className="badge py-3 bg-slate-100" key={t.slot} >{pokeTypes[t.type.name as keyof object]} {capitalize(t.type.name ?? "")}</div>
                        ))}
                    </div>
                    <p className="whitespace-pre">{briefDesc}</p>
                </div>
            </div>
            <div className='h-[360px] flex flex-col items-center relative gap-2 w-full'>
                <div className="self-start">
                    <h1 className="text-2xl font-semibold">Evo Chain</h1>
                </div>
                <div className="flex flex-wrap">
                    {evolves.length > 0 && evolves.map((chain, i) => (
                        <div key={chain.name} className="flex items-center">
                            <Card  {...(chain) as PokeItemUrl} />
                            {i + 1 !== evolves.length && <ChevronRight height={36} width={36} />}
                        </div>
                    ))}
                    {/* {evolvesTo && evolvesTo} */}
                </div>
            </div>
        </Layout>
    );
}

export default Pokemon;