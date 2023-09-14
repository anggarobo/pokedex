import { Fetcher,  } from "swr"
import { HttpResponse } from "~/types/http"

const BASE_URL = 'https://pokeapi.co/api/v2'

export function http<T>(endpoint?: string, options?: RequestInit): Promise<T> {
    const result: Promise<T> = new Promise((resolve, reject) => {
        const api = endpoint?.includes("http") ? endpoint : `${BASE_URL}${endpoint}`
        return fetch(api, {
            ...options,
        }).then(response => {
            const json = response.json()
            resolve(json)
        }).catch(error => {
            reject(error)
        })
    })

    return result
}

export const fetcher: Fetcher<HttpResponse> = (endpoint: string, options?: RequestInit) => http(endpoint, options)