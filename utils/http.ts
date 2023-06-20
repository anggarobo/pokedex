import { Fetcher,  } from "swr"
import { FetcherResponse } from "swr/_internal"
import { HttpResponse } from "~/types/http"

const baseURL = 'https://pokeapi.co/api/v2'

export const http = (endpoint?: string, options?: RequestInit): FetcherResponse<HttpResponse> => {
    return new Promise((resolve, reject) => {
        const api = endpoint?.includes("http") ? endpoint : `${baseURL}${endpoint}`
        return fetch(api, {
            ...options,
        }).then(response => {
            const json = response.json()
            resolve(json)
        }).catch(error => {
            reject(error)
        })
    }) as FetcherResponse<HttpResponse>
}

export const fetcher: Fetcher<HttpResponse> = (endpoint: string, options?: RequestInit) => http(endpoint, options)