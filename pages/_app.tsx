import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import PokeProvider from '~/context/pokedex'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PokeProvider>
      <Component {...pageProps} />
    </PokeProvider>
  )
}
