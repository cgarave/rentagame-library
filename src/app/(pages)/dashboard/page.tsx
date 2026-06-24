import {getUserRentals, getGames} from "@/lib/actions";
import {redirect} from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import GameList from "@/app/(pages)/dashboard/DashboardList";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        redirect('/sign-in');
    }
    if (session?.user.isAdmin === false) {
        redirect('/');
    }

    const games = await getGames()
    const userRentals = await getUserRentals()

    return (
        <>
            <main className={'flex flex-col gap-y-6 py-30 px-40 h-screen'}>
                <h1 className={'font-bold text-4xl'}>Dashboard</h1>
                <GameList games={games} userRentals={userRentals}/>
            </main>
        </>
    )
}