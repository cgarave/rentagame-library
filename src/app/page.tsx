import { GamesContainer } from "@/components/GamesContainer";
import GameCard from "@/components/GameCard";
import { getGames } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session?.user) {
        throw new Error("Not logged in!");
    }

    const games = await getGames();
    const notRentedGames = await prisma.game.findMany({
        where: {
            rentals: {
                none: {
                    userId: session.user.id,
                },
            },
        },
    })

    return (
        <>
            <main className={'flex flex-col gap-y-6 mt-30 px-3 xl:px-0 xl:w-[1280px] xl:mx-auto'}>
                <h1 className={'font-bold text-4xl'}>Browse Games</h1>
                <GamesContainer>
                    {
                        session.user ?
                            notRentedGames.map(game => (
                                <GameCard key={game.id}
                                          id={game.id}
                                          gameImage={game.gameImage}
                                          gameTitle={game.gameTitle}
                                          weeklyPrice={game.weeklyPrice}
                                          monthlyPrice={game.monthlyPrice}
                                          availableTrophy={game.availableTrophy}
                                          availableNonTrophy={game.availableNonTrophy}
                                          renters={game.renters}
                                          slot={game.slot}
                                          includeButton={true}
                                          includeBadge={false}
                                />
                            )) :
                            games.map((game) => (
                                <GameCard key={game.id}
                                          id={game.id}
                                          gameImage={game.gameImage}
                                          gameTitle={game.gameTitle}
                                          weeklyPrice={game.weeklyPrice}
                                          monthlyPrice={game.monthlyPrice}
                                          availableTrophy={game.availableTrophy}
                                          availableNonTrophy={game.availableNonTrophy}
                                          renters={game.renters}
                                          slot={game.slot}
                                          includeButton={true}
                                          includeBadge={false}
                                />
                            ))
                    }
                </GamesContainer>
            </main>
        </>
    )
}
