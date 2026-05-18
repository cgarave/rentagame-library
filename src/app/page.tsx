import prisma from "@/lib/prisma"
import Header from '@/components/Header'
import { GamesContainer } from "@/components/GamesContainer";
import GameCard from "@/components/GameCard";

export default async function Home() {
    const games = await prisma.game.findMany()
    return (
        <>
            <Header />
            <main className={'flex flex-col gap-y-6 mt-30 px-3 xl:px-0 xl:w-[1280px] xl:mx-auto'}>
                <h1 className={'font-bold text-4xl'}>Browse Games</h1>
                <GamesContainer>
                    {
                        games.map((game) => (
                            <GameCard key={game.id}
                                      gameDetails={{
                                          gameImage: game.gameImage,
                                          gameTitle: game.gameTitle,
                                          weeklyPrice: game.weeklyPrice,
                                          monthlyPrice: game.monthlyPrice,
                                          availableTrophy: game.availableTrophy,
                                          availableNonTrophy: game.availableNonTrophy,
                                          renters: 0,
                                          availableSlot: game.slot,
                                      }}
                            />
                        ))
                    }
                </GamesContainer>
            </main>
        </>
    )
}
