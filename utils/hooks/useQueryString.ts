import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

function useQueryString() {
    const { push } = useRouter()
    const searchParams = useSearchParams()!

    const createQueryString = React.useCallback(
        (name: string, value: string) => {
        const params = new URLSearchParams(searchParams as unknown as string)
        params.set(name, value)

        return params.toString()
        },
        [searchParams]
    )
    console.log(searchParams)

    const pushQuery = (key: string, value: string) => {
        push(`/?${createQueryString(key, `${value}`)}`)
    }
    return {
        pushQuery,
        getQuery: (key: string) => searchParams.get(key)
    }
}

export default useQueryString;