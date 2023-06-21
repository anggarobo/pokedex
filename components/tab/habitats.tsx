import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import { ResponseType } from "~/types/http";
import { http } from "~/utils/http";
import Loader from "../loader";
import Link from "next/link";
import { capitalize } from "~/utils/common";

function HabitatTabs() {
    const { data, isLoading } = useSWR<ResponseType>('/pokemon-habitat', http as Fetcher<ResponseType>)
    const { asPath } = useRouter()
    const [flag, habitat] = asPath?.slice(1)?.split('/')

    return (
        <>
            <div className="tabs tabs-boxed">
                {isLoading && <Loader />}
                {data?.results && data.results.map(({ name }, i) => (
                    <Link key={name} className={`tab ${(habitat === name || (i === 0 && !habitat)) ? "tab-active" : ""}`} href={`/${flag}/${name}`}>{capitalize(name ?? "")}</Link>
                ))}
            </div>
            {habitat}
        </>
    );
}

export default HabitatTabs;