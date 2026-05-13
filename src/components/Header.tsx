import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header className="fixed top-0 flex flex-row justify-between items-center p-6 bg-zinc-800 w-full text-white">
            <h1 className='font-semibold'>RentaPH</h1>
            <div className={'flex flex-row gap-x-6 items-center'}>
                <ul className="flex flex-row gap-x-6 cursor-pointer font-semibold text-sm">
                    <li>
                        <Link href={'/'}>Browse Games</Link>
                    </li>
                    <li>
                        <Link href={'/my-rentals'}>My Rentals</Link>
                    </li>
                    <li>
                        <Link href={'/dashboard'}>Dashboard</Link>
                    </li>
                </ul>
                <Button asChild variant={'secondary'} className={'px-6'}>
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        </header>
    )
}