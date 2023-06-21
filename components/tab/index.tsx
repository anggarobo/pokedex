import Link from "next/link";
import { useRouter } from "next/router";

function Tab() {
    const { pathname } = useRouter()
    const [flag] = pathname?.slice(1)?.split('/')

    return (
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box shadow-xl">
            <li>
                <Link href="/" className={pathname === "/" ? "bg-gray-200" : ""}>
                    🏠 Home
                </Link>
            </li>
            <li>
                <Link href="/habitats" className={flag === "habitats" ? 'bg-gray-200' : ''} >
                    🏔 Habitats
                </Link>
            </li>
            <li>
                <Link href="types" className={flag === "types" ? 'bg-gray-200' : ''} >
                    <span className="badge badge-xs badge-info"></span>
                    Types
                </Link>
            </li>
        </ul>
    );
}

export default Tab;