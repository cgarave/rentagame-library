import Link from 'next/link'
export default function Header() {
    const page = (i: string): string => {
        if (i === 'Dashboard') {
            return '/dashboard'
        } else if (i === 'My Rentals') {
            return '/my-rentals'
        }
        return '/'
    }
    return (
        <header className="fixed top-0 flex flex-row justify-between items-center p-6 bg-zinc-800 w-full">
            <h1>RentaPH</h1>
            <ul className="flex flex-row gap-x-6 cursor-pointer">
                {
                    ['Home', 'My Rentals', 'Dashboard'].map(item => (
                        <li key={item}>
                            <Link href={page(item)}>{item}</Link>
                        </li>
                    ))
                }
            </ul>
        </header>
    )
}