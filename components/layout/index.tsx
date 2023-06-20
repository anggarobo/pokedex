import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

interface PropsType {
    children: JSX.Element | JSX.Element[]
}

function Layout({ children }: PropsType) {
    return (
        <main className={`container max-w-[1600px] m-auto flex min-h-screen flex-col items-center justify-start gap-12 py-8 ${inter.className}`}>
            {children}
        </main>
    );
}

export default Layout;