import { SyntheticEvent, useMemo, useState } from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import useSWR from 'swr'
import Card from '~/components/card'
import { http } from '~/utils/http'
import { ResponseType } from '~/types/http'
import SearchIcon from '~/components/icons/search'
import Layout from '~/components/layout'
import CardLoader from '~/components/card/skeleton'
import { PokeItem } from '~/types/pokemon'
import Tab from '~/components/tab'
import { usePokeContext } from '~/context/pokedex'
import useQueryString from '~/utils/hooks/useQueryString'
import usePokeSearch from '~/utils/hooks/usePokeSearch';

const LIMITER = 30
const EVOCHAIN_ENDPOINT = `/evolution-chain/?offset=0&limit=${LIMITER}`

export const getServerSideProps: GetServerSideProps<{ evochain: ResponseType, initApi?: string }> = async () => {
  const evochain = await http<ResponseType>(EVOCHAIN_ENDPOINT)
  const initApi = !evochain.previous ? evochain?.next?.split("?")?.[0] : undefined
  return { props: { evochain, initApi } }
}

export default function Home({ evochain, initApi }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [page, setPage] = useState(1)
  const [api, setApi] = useState(initApi)
  const { setActiveSearch } = usePokeContext()
  const { pushQueries, query } = useQueryString()
  const { data: evoline, isLoading } = useSWR<ResponseType>(api+query, http)
  const pokes = usePokeSearch()
  
  const data = evoline ?? evochain
  const pokemons = useMemo(() => pokes.length > 0 ? pokes : data.results, [pokes, data.results])
  const visiblePagination = ((data?.count ?? 0) > pokemons?.length) || pokemons.length < LIMITER

  const onPage = (e: SyntheticEvent<HTMLButtonElement>) => {
    const target: string = e.currentTarget.name
    const [ url, params ] = data[target as "next" | "previous"]?.split("?")
    const [offsetParam, limitParam] = params?.split("&")
    const offsetValue = offsetParam?.split("=")?.[1]
    const limitValue = limitParam?.split("=")?.[1]
    setPage(prev => prev+1)
    pushQueries({
      offset: offsetValue,
      limit: limitValue
    })
    setApi(url)
  }

  return (
    <Layout>
      <div className="navbar rounded-xl flex gap-12">
        <button 
          className="btn shadow-xl justify-start bg-white hover:bg-slate-50 hover:outline hover:outline-2 hover:outline-neutral-100 border-2 flex flex-grow text-start lowercase text-gray-400 font-normal rounded-box" onClick={() => setActiveSearch(true)}
        >
          <SearchIcon color='#9ca3af' height={24} />
          Search a Pokemon
        </button>
        <Tab />
      </div>
      <div className='flex flex-wrap gap-8 justify-evenly'>
        {isLoading && ((new Array(6).map((_, i) => (<CardLoader key={i} />))))}
        {pokemons && pokemons.map((poke, id) => (
          <Card key={id} {...(pokes.length > 0 ? { pokemon: poke as PokeItem } : poke)} />
        ))}
      </div>
      <>
        { visiblePagination && (
              <div className="join shadow-xl">
                <button 
                  name='previous' 
                  className="join-item btn capitalize" 
                  disabled={page === 1} 
                  onClick={onPage} 
                >
                  Prev
                </button>
                <div className="join-item capitalize flex items-center px-6 bg-white text-3xl" >{page}</div>
                <button 
                  name='next' 
                  className="join-item btn capitalize" 
                  onClick={onPage} 
                >
                  Next
                </button>
              </div>
          )}
      </>
    </Layout>
  )
}