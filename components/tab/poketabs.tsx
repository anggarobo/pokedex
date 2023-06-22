import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import { ResponseType } from "~/types/http";
import { http } from "~/utils/http";
import Loader from "../loader";
import Link from "next/link";
import { capitalize } from "~/utils/common";
import { pokeTypes } from "~/constants/pokemon";

function PokeTabs({ endpoint = "habitat" }: { endpoint?: "habitat" | "type" }) {
    const api = endpoint === "habitat" ? `/pokemon-${endpoint}` : `/${endpoint}`
    const { data, isLoading } = useSWR<ResponseType>(api, http as Fetcher<ResponseType>)
    const { asPath } = useRouter()
    const [flag, subflag] = asPath?.slice(1)?.split('/')
    const emojiTypes = (name: string) => endpoint === "type" ? pokeTypes[name as keyof object] : ""
    
    const onPrev = () => {
        const currentSlider = 0
        const items = document.querySelectorAll(".carousel-item") as unknown as HTMLElement[]
        
        if (items) {
            items.forEach((item, i) => {
                item.style.transform = `translateX(${100 * (i - currentSlider)}%)`
            })
        }
    }

    if (endpoint === "type") {
        return (
            <div className="flex w-full items-center rounded-lg">
                <a 
                    // href={`#slide2`} 
                    className="px-2 py-1"
                    onClick={onPrev}
                >
                    ❮
                </a>
                <div className={["carousel w-full bg-slate-100 rounded-lg shadow-xl gap-1", isLoading && "justify-center"].join(" ")}>
                    {isLoading ? <Loader /> : data?.results.map(({ name }, i) => {
                        const id = i + 1
                        return (
                            <>
                                <div id={`slide${id + 1}`} key={name} className="carousel-item">
                                    <Link className={`tab ${(subflag === name || (i === 0 && !subflag)) ? "tab-active text-neutral-900 rounded-lg" : "text-gray-500"}`} href={`/${flag}/${name}`}>{emojiTypes(name as string)} {capitalize(name ?? "")}</Link>
                                </div>
                            </>
                        )
                    })}
                </div>
                <a href={`#slide10`} className="px-2 py-1">❯</a>
            </div>
        )
    }

    return (
        <>
            <div className="tabs tabs-boxed justify-center">
                {isLoading && <Loader />}
                {data?.results && data.results.map(({ name }, i) => (
                    <Link key={name} className={`tab ${(subflag === name || (i === 0 && !subflag)) ? "tab-active " : ""}`} href={`/${flag}/${name}`}>{emojiTypes(name as string)} {capitalize(name ?? "")}</Link>
                ))}
            </div>
        </>
    );
}

export default PokeTabs;