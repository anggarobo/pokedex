import { Inter } from "next/font/google";
import Link from "next/link";
import Squirtle from "../icons/squirtle";

const inter = Inter({ subsets: ['latin'] })

interface PropsType {
    children: JSX.Element | JSX.Element[]
}

function Layout({ children }: PropsType) {
    return (
        <main className={`container max-w-[1600px] m-auto flex min-h-screen flex-col items-center justify-start gap-12 py-8 ${inter.className}`}>
            <div className='flex items-center justify-center w-full -mb-8'>
                <Link href="/" className=" flex items-center gap-1 normal-case text-2xl font-bold">
                    <Squirtle />
                    Pokedex
                </Link>
            </div>
            {children}
        </main>
    );
}

export default Layout;