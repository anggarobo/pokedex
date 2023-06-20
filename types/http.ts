import { PokeResultType } from './pokemon'

export interface ResponseType {
    count: number
    next: string
    previous: string
    results: PokeResultType[]
}

export type HttpResponse<T=unknown> = T