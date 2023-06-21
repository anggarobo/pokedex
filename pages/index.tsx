import React from 'react'
import useSWR, { Fetcher, useSWRConfig } from 'swr'
import Card from '~/components/card'
import { http } from '~/utils/http'
import { ResponseType } from '~/types/http'
import SearchIcon from '~/components/icons/search'
import Layout from '~/components/layout'
import CardLoader from '~/components/card/skeleton'
import { PokeItem, PokeResultType } from '~/types/pokemon'

interface PageType {
  offset: number
  limit: number
}

const initPage: PageType = {
  offset: 0,
  limit: 30,
}

export default function Home() {
  const [{ limit, offset }, setPage] = React.useState<PageType>(initPage)
  const [keyword, setKeyword] = React.useState("")
  const api = `/evolution-chain/?offset=${offset}&limit=${limit}`
  const { data, isLoading } = useSWR<ResponseType>(api, http as Fetcher<ResponseType>)
  const { mutate } = useSWRConfig()
  const [pokes, setPokes] = React.useState<PokeItem[]>([])

  const pokemons = React.useMemo(() => {
    const pokesFiltered = pokes?.filter(p => p.name.includes(keyword))
    const pokeSearch = pokesFiltered?.map(p => ({ url: p?.species?.url?.replace("pokemon-species", "evolution-chain") }))
    return keyword ? pokeSearch : data?.results
  }, [pokes, data?.results, keyword])

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const endpoint = `/pokemon/${keyword}`
    try {
      if (keyword) {
        await mutate(endpoint, () => http(endpoint)).then(pokemons => setPokes([pokemons as unknown as PokeItem]))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const onPage = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id
    setPage(prev => ({
      limit: id === "next" ? prev.limit + 30 : prev.limit - 30,
      offset: id === "next" ? prev.offset + 30 : prev.offset - 30
    }))
  }

  return (
    <Layout>
      <div className="navbar bg-base-100 rounded-xl shadow-xl">
        <div className='flex items-center w-full p-2 gap-12'>
          <a className="btn btn-ghost normal-case text-xl">Pokedex</a>
          <div className="join w-full flex-grow flex">
            <form onSubmit={onSearch} className='flex flex-grow'>
              <input id='search' className="input input-bordered flex-grow join-item rounded-r-lg" onChange={onType} placeholder="Search Pokemons" />
              <button className="btn join-item rounded-r-lg" type='submit'>
                <SearchIcon height={24} />
              </button>
            </form>
          </div>
        </div>
      </div>
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box shadow-xl">
        <li>
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Inbox
            {/* <span className="badge badge-sm">99+</span> */}
          </a>
        </li>
        <li>
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Updates
            {/* <span className="badge badge-sm badge-warning">NEW</span> */}
          </a>
        </li>
        <li>
          <a>
            Stats
            <span className="badge badge-xs badge-info"></span>
          </a>
        </li>
      </ul>
      <div className='flex flex-wrap gap-8 justify-evenly'>
        {isLoading && ((new Array(6).map((_, i) => (<CardLoader key={i} />))))}
        {pokemons && pokemons.map(poke => (
          <Card key={poke?.url} {...poke} />
        ))}
      </div>
      <>
          {(!isLoading && (data?.count ?? 0) > (pokemons?.length ?? 0)) && (
          <div className="join">
            <button id='prev' className="join-item btn capitalize" onClick={onPage} >Prev</button>
            <button id='next' className="join-item btn capitalize" onClick={onPage} >Next</button>
          </div>
          )}
      </>
    </Layout>
  )
}
