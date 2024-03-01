import Image from 'next/image'
import Link from 'next/link'


export default function NavBar({ }) {

    return (
        <div style={{ height: "70px" }}
            className="flex flex-row justify-evenly items-center">
            <Link href="/">
                <Image src="/icon/home.png" alt="Homepage Icon" width={50} height={50} />
            </Link>
            <Link href="/scan">
                <Image src="/icon/scan.png" alt="Scan Icon" width={50} height={50} />
            </Link>
            <Link href="/community">
                <Image src="/icon/community.png" alt="Community Icon" width={50} height={50} />
            </Link>
            <Link href="/market">
                <Image src="/icon/market.png" alt="Market Icon" width={50} height={50} />
            </Link>
            <Link href="/settings">
                <Image src="/icon/settings.png" alt="Settings Icon" width={50} height={50} />
            </Link>
        </div>
    )
}
