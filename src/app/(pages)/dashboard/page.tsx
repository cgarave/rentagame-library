import {getUsers, getUserRentals, getGames} from "@/lib/actions";
import {redirect} from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardList from "@/app/(pages)/dashboard/DashboardList";

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

    const users = await getUsers()
    const userRentals = await getUserRentals()
    const games = await getGames()

    return (
        <>
            <main className={'flex flex-col gap-y-6 py-30 px-40 h-screen'}>
                <h1 className={'font-bold text-4xl'}>Dashboard</h1>
                <DashboardList games={games} users={users} userRentals={userRentals}/>
            </main>
        </>
    )
}