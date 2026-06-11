import { GamesContainer } from "@/components/GamesContainer";
import GameCard from "@/components/GameCard";
import { findRental } from "@/lib/actions";

export default async function MyRentalsPage() {
    const activeGames = await findRental('cmq84g4du00036rpby5amznbr');

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