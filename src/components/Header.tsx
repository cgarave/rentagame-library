'use client'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const { data: session, error, isPending, refetch } = useSession()
    async function handleLogout() {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                }
            }
        })
    }
    return (
        <header className="fixed top-0 flex flex-row justify-between items-center px-6 py-4 bg-zinc-800 w-full text-white">
            <h1 className='font-bold text-xl'>GameRentPH</h1>
            <nav className={'flex flex-row gap-x-6 items-center'}>
                <ul className="flex flex-row gap-x-6 text-sm">
                    <li>
                        <Link className={`${pathname === '/' ? 'text-white font-semibold' : 'text-zinc-400 cursor-pointer py-4'}`} href={'/'}>Browse Games</Link>
                    </li>
                    {
                        session?.user && (
                            <li>
                                <Link className={`${pathname === '/my-rentals' ? 'text-white font-semibold' : 'text-zinc-400 cursor-pointer py-4'}`} href={'/my-rentals'}>My Rentals</Link>
                            </li>
                        )
                    }
                    {
                        session?.user.isAdmin && (
                            <li>
                                <Link className={`${pathname === '/dashboard' ? 'text-white font-semibold' : 'text-zinc-400 cursor-pointer py-4'}`} href={'/dashboard'}>Dashboard</Link>
                            </li>
                        )
                    }
                </ul>
                {
                    session?.user ? <Button variant={'secondary'} className={'px-6'} onClick={handleLogout}>
                                        {session?.user.name}
                                    </Button>
                        : <Button asChild variant={'secondary'} className={'px-6'}>
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                }
            </nav>
        </header>
    )
}