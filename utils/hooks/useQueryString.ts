import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

function useQueryString() {
    const { push, asPath } = useRouter()
    const searchParams = useSearchParams()!

    const createQueryString = React.useCallback(
        (name: string, value: string) => {
        const params = new URLSearchParams(searchParams as unknown as string)
        params.set(name, value)

        return params.toString()
        },
        [searchParams]
    )

    const pushQuery = (key: string, value: string) => {
        push(`/?${createQueryString(key, `${value}`)}`)
    }

    const pushQueries = (arg: Record<string, string>) => {
        const query = Object.keys(arg)
        const params = query.map(q => `${q}=${arg[q]}`).join("&")
        push(`/?${params}`)
    }

    return {
        pushQuery,
        getQuery: (key: string) => searchParams.get(key),
        pushQueries,
        query: asPath?.slice(1)
    }
}

export default useQueryString;