import Header from '@/components/Header'
import { GamesContainer } from "@/components/GamesContainer";
import GameCard from "@/components/GameCard";
import { getGames } from "@/lib/actions";

export default async function Home() {
    const games = await getGames();
    return (
        <>
            <Header />
            <main className={'flex flex-col gap-y-6 mt-30 px-3 xl:px-0 xl:w-[1280px] xl:mx-auto'}>
                <h1 className={'font-bold text-4xl'}>Browse Games</h1>
                <GamesContainer>
                    {
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
                            />
                        ))
                    }
                </GamesContainer>
            </main>
        </>
    )
}
