import React from "react";
import SearchIcon from "~/components/icons/search";
import useQueryString from "~/utils/hooks/useQueryString";

interface PokeContextType {
    activeSearch: boolean
    setActiveSearch: (val: boolean) => void
    keyword: string
    setKeyword: (val: string) => void
}

const initContext: PokeContextType = {
    activeSearch: false,
    setActiveSearch: () => { },
    keyword: "",
    setKeyword: () => { }
}

const PokeContext = React.createContext(initContext)
export const usePokeContext = () => React.useContext(PokeContext)

export default function PokeProvider({ children }: { children: JSX.Element | JSX.Element[] | string }) {
    const [keyword, setKeyword] = React.useState("")
    const [activeSearch, setActiveSearch] = React.useState(false)
    const { pushQueries } = useQueryString()
    const inputRef = React.useRef<HTMLInputElement>(null)

    const onSearch = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        pushQueries({pokemon: keyword})
        setActiveSearch(true)
    }, [keyword, pushQueries])

    const onClose = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        setTimeout(() => {
            setActiveSearch(false)
        }, 350);
    }

    React.useEffect(() => {
        if (inputRef?.current && activeSearch) {
            inputRef.current.focus()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputRef.current, activeSearch])

    return (
        <PokeContext.Provider
            value={{
                keyword,
                setKeyword,
                activeSearch,
                setActiveSearch
            }}
        >
            {activeSearch && (
                <div
                    onClick={onClose}
                    style={{
                        position: "fixed",
                        zIndex: 100,
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transitionDuration: '700ms',
                        backgroundColor: '#0003',
                        backdropFilter: 'blur(4px)',
                        top: 0,
                        left: 0
                    }}
                >
                    <form 
                        onSubmit={onSearch}
                        style={{
                            margin: '0 auto',
                            width: '100%',
                            maxWidth: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 0,
                            borderRadius: '0.75rem',
                            boxShadow: '0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a',
                            background: '#fff'
                        }}
                    >
                        <div className="join w-full flex items-center justify-center m-auto relative">
                            <input
                                id='search'
                                ref={inputRef}
                                className="input input-bordered join-item w-full rounded-xl"
                                placeholder="Search a pokemon"
                                style={{
                                    borderRadius: '12px'
                                }}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button className="btn join-item rounded-r-xl absolute" style={{ right: 0 }} type='submit'>
                                <SearchIcon height={24} />
                            </button>
                            
                        </div>
                    </form>
                </div>
            )}
            {children}
        </PokeContext.Provider>
    )
}