import { GamesContainer } from "@/components/GamesContainer";
import GameCard from "@/components/GameCard";
import { getGames } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import {GameDetails} from "@/types/GameDetails";
import {AlertBasic} from "@/components/Alert";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session?.user) {
        const games = await getGames();
        return (
            <>
                <main className={'flex flex-col gap-y-6 mt-30 px-3 xl:px-0 xl:w-[1280px] xl:mx-auto'}>
                    <AlertBasic title={'Announcement'}
                                description={['Effective today, we are removing the account deposit requirement. We realized that requiring a deposit goes against our goal of providing an affordable game rental service.',
                                            'For existing renters who have already paid an account deposit, your deposit will be refunded once your rental period expires.']}
                    />
                    <h1 className={'font-bold text-4xl'}>Browse Games</h1>
                    <GamesContainer>
                        {
                            games.map((game: GameDetails) => (
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
    } else {
        const notRentedGames = await prisma.game.findMany({
            where: {
                rentals: {
                    none: {
                        userId: session.user.id,
                    },
                },
            },
            orderBy: {
                gameTitle: 'desc'
            },
        })
        return (
            <>
                <main className={'flex flex-col gap-y-6 mt-30 px-3 xl:px-0 xl:w-[1280px] xl:mx-auto'}>
                    <AlertBasic title={'Announcement'}
                                description={['Effective today, we are removing the account deposit requirement. We realized that requiring a deposit goes against our goal of providing an affordable game rental service.',
                                    'For existing renters who have already paid an account deposit, your deposit will be refunded once your rental period expires.']}
                    />
                    <h1 className={'font-bold text-4xl'}>Browse Games</h1>
                    <GamesContainer>
                        {
                            notRentedGames.map((game: GameDetails) => (
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



    // return (
    //     <>
    //         <main className={'flex flex-col gap-y-6 mt-30 px-3 xl:px-0 xl:w-[1280px] xl:mx-auto'}>
    //             <h1 className={'font-bold text-4xl'}>Browse Games</h1>
    //             <GamesContainer>
    //                 {
    //                     session.user ?
    //                         notRentedGames.map(game => (
    //                             <GameCard key={game.id}
    //                                       id={game.id}
    //                                       gameImage={game.gameImage}
    //                                       gameTitle={game.gameTitle}
    //                                       weeklyPrice={game.weeklyPrice}
    //                                       monthlyPrice={game.monthlyPrice}
    //                                       availableTrophy={game.availableTrophy}
    //                                       availableNonTrophy={game.availableNonTrophy}
    //                                       renters={game.renters}
    //                                       slot={game.slot}
    //                                       includeButton={true}
    //                                       includeBadge={false}
    //                             />
    //                         )) :
    //                         games.map((game) => (
    //                             <GameCard key={game.id}
    //                                       id={game.id}
    //                                       gameImage={game.gameImage}
    //                                       gameTitle={game.gameTitle}
    //                                       weeklyPrice={game.weeklyPrice}
    //                                       monthlyPrice={game.monthlyPrice}
    //                                       availableTrophy={game.availableTrophy}
    //                                       availableNonTrophy={game.availableNonTrophy}
    //                                       renters={game.renters}
    //                                       slot={game.slot}
    //                                       includeButton={true}
    //                                       includeBadge={false}
    //                             />
    //                         ))
    //                 }
    //             </GamesContainer>
    //         </main>
    //     </>
    // )
}
