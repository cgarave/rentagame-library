import { GamesContainer } from "@/components/GamesContainer";
import { redirect } from "next/navigation";
import GameCard from "@/components/GameCard";
import { findGameRental } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {GameDetails} from "@/types/GameDetails";

export default async function MyRentalsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        return redirect('/sign-in');
    }

    // const activeGames = await findRental(session.user.id);
    const games = await findGameRental(session.user.id);
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (
        <>
            <main className={'flex flex-col gap-y-6 mt-30 px-3 xl:px-0 xl:w-[1280px] xl:mx-auto'}>
                <h1 className={'font-bold text-4xl'}>My Rentals</h1>
                <GamesContainer>
                    {
                        games.map((game) => {
                            return (
                                <GameCard key={game.id}
                                          gameImage={game.game.gameImage}
                                          gameTitle={game.game.gameTitle}
                                          includeButton={false}
                                          includeBadge={true}
                                          expiresAt={game.expiresAt.toLocaleString('en-US', {
                                              weekday: "short",
                                              month: "long",
                                              day: "numeric",
                                              year: "numeric",
                                              hour: "numeric",
                                              minute: "2-digit",
                                              hour12: true,
                                          })}
                                />
                            )
                        })
                    }
                </GamesContainer>
            </main>
        </>
    )
}