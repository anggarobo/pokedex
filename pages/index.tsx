import React from 'react'
import useSWR, { Fetcher, useSWRConfig } from 'swr'
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

interface PageType {
  offset: number
  limit: number
}

const initPage: PageType = {
  offset: 0,
  limit: 30,
}

export default function Home() {
  const { setActiveSearch } = usePokeContext()
  const { getQuery, pushQuery } = useQueryString()
  const offsetUrl = getQuery('offset')
  const keyword = getQuery('pokemon')
  const [{ limit, offset }, setPage] = React.useState<PageType>(initPage)
  // const [keyword, setKeyword] = React.useState("")
  const api = `/evolution-chain/?offset=${offsetUrl ?? offset}&limit=${limit}`
  const { data, isLoading } = useSWR<ResponseType>(api, http as Fetcher<ResponseType>)
  const { mutate } = useSWRConfig()
  const [pokes, setPokes] = React.useState<PokeItem[]>([])

  const pokemons = React.useMemo(() => {
    const pokesFiltered = pokes?.filter(p => p.name.includes(keyword ?? ""))
    return keyword ? pokesFiltered : data?.results
  }, [pokes, data?.results, keyword])

  const search = async (poke: string) => {
    const endpoint = `/pokemon/${poke}`
    try {
      if (poke) {
        await mutate(endpoint, () => http(endpoint)).then(pokemons => setPokes([pokemons as unknown as PokeItem]))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onPage = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id
    setPage(prev => {
      const offsetPage = id === "next" ? prev.offset + 30 : prev.offset - 30
      pushQuery('offset', `${offsetPage}`)
      return {
        ...prev,
        offset: offsetPage
      }
    })
  }

  React.useEffect(() => {
    if (keyword) search(keyword)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  return (
    <Layout>
      <div className="navbar rounded-xl flex gap-12">
        <button className="btn shadow-xl justify-start bg-white hover:bg-slate-50 hover:outline hover:outline-2 hover:outline-neutral-100 border-2 flex flex-grow text-start capitalize text-gray-400 font-normal rounded-box" onClick={() => setActiveSearch(true)}>
          <SearchIcon color='#9ca3af' height={24} />
          Search Pokemon
        </button>
        <Tab />
      </div>
      <div className='flex flex-wrap gap-8 justify-evenly'>
        {isLoading && ((new Array(6).map((_, i) => (<CardLoader key={i} />))))}
        {pokemons && pokemons.map((poke, id) => (
          <Card key={id} {...(keyword ? { pokemon: poke as PokeItem } : poke)} />
        ))}
      </div>
      <>
          {(!isLoading && (data?.count ?? 0) > (pokemons?.length ?? 0)) && (
          <div className="join">
            <button id='prev' className="join-item btn capitalize" onClick={onPage} >Prev</button>
            <button className="join-item btn capitalize" disabled >{(offset+30)/30}</button>
            <button id='next' className="join-item btn capitalize" onClick={onPage} >Next</button>
          </div>
          )}
      </>
    </Layout>
  )
}
