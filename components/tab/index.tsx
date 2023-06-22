import Link from "next/link";
import { useRouter } from "next/router";

function Tab() {
    const { pathname } = useRouter()
    const [flag] = pathname?.slice(1)?.split('/')

    return (
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-xl shadow-xl max-h-12 gap-2 p-1 items-center outline2 border-2 h-12 m-auto">
            <li>
                <Link href="/" className={["h-full", pathname === "/" ? "bg-gray-200" : ""].join(' ')}>
                    🏠 Home
                </Link>
            </li>
            <li>
                <Link href="/habitats" className={["h-full", flag === "habitats" ? 'bg-gray-200' : ''].join(' ')} >
                    🏔 Habitats
                </Link>
            </li>
            <li>
                <Link href="/poke-types" className={['h-full', flag === "types" ? 'bg-gray-200' : ''].join(' ')} >
                    <span className="badge badge-xs badge-info"></span>
                    Types
                </Link>
            </li>
        </ul>
    );
}

export default Tab;