import React from "react";
import Image from "next/image";
import useSWR, { Fetcher } from 'swr'
import { http } from '~/utils/http'
import { capitalize } from "~/utils/label";
import { PokeItem } from "~/types/pokemon";
import { EvoChainType } from "~/types/evo-chain";
import { useRouter } from "next/router";
import { pokeTypes } from "~/constants/pokemon";
import CardLoader from "./skeleton";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

const typed = (val: string) => pokeTypes[val as keyof object]

function Card({ url }: { url: string, name?: string }) {
    const { push } = useRouter()
    const [imgLoaded, setImgLoaded] = React.useState(false)
    const { data, isLoading } = useSWR<EvoChainType>(url, http as Fetcher<EvoChainType>)
    const api = data?.chain.species.name ? `${baseUrl}/${data?.chain.species.name}` : undefined
    const { data: d, isLoading: isLoadingProps } = useSWR<PokeItem>(api, http as Fetcher<PokeItem>)
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const imgUrl = d?.sprites?.other?.dream_world?.front_default ?? ""

    const navigate = () => {
        push(`/pokemons/${data?.chain.species.name}`)
    }

    const onNavigate = () => {
        if (buttonRef?.current) {
            buttonRef?.current.click()
        }
    }

    const onImgCompleted = () => setImgLoaded(true)

    if (isLoading) return <CardLoader />

    return (
        <div className='h-[360px] flex flex-col items-center relative'>
            <figure className='absolute z-10 h-40 cursor-pointer' onClick={onNavigate}>
                { (imgUrl && !isLoading) ? <Image src={imgUrl} onLoadingComplete={onImgCompleted} alt={data?.chain.species.name ?? ""} width={180} height={160} className={[imgLoaded ? 'scale-100 h-full' : 'blur-xl'].join(' ')} /> : (
                    <div className="animate-pulse flex space-x-4 w-full">
                        <div className="rounded-lg bg-slate-200 h-40 w-40 blur-xl"></div>
                    </div>
                ) }
            </figure>
            <div className={`card w-72 bg-base-100 shadow-xl mt-24 pt-12 cursor-pointer hover:bg-slate-50 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 duration-300`} onClick={onNavigate}>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{capitalize(data?.chain.species.name ?? "")}</h2>
                    <div className="card-actions justify-end">
                        {isLoadingProps && <span className="loading loading-dots"></span>}
                        {d?.types && d.types.map(type => (
                            <div key={type.slot} className={`badge py-3 badge-ghost gap-2`}>
                                {typed(type.type.name ?? "")} {capitalize(type.type.name ?? "")}
                            </div>
                        ))}
                    </div>
                    <button ref={buttonRef} onClick={navigate} className="btn btn-sm btn-link mt-2 capitalize hover:bg-primary-content">Detail</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Card);