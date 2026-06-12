import { GamesContainer } from "@/components/GamesContainer";
import { redirect } from "next/navigation";
import GameCard from "@/components/GameCard";
import { findRental } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyRentalsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        return redirect('/sign-in');
    }

    const activeGames = await findRental(session?.user.id);

    return (
        <>
            <main className={'flex flex-col gap-y-6 mt-30 px-3 xl:px-0 xl:w-[1280px] xl:mx-auto'}>
                <h1 className={'font-bold text-4xl'}>My Rentals</h1>
                <GamesContainer>
                    {
                        activeGames.map(game => {
                            return (
                                <GameCard key={game.id}
                                          gameImage={game.gameImage}
                                          gameTitle={game.gameTitle}
                                          includeButton={false}
                                />
                            )
                        })
                    }
                </GamesContainer>
            </main>
        </>
    )
}