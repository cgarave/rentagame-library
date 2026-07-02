import { GamesContainer } from "@/components/GamesContainer";
import GameCard from "@/components/GameCard";
import { getGames } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import {GameDetails} from "@/types/GameDetails";
import { AlertBasic } from "@/components/Alert";
import Link from "next/link";
import {HeroBanner} from "@/components/HeroBanner";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const games = await getGames();
    const notRentedGames = await prisma.game.findMany({
        where: {
            rentals: {
                none: {
                    userId: session?.user.id,
                },
            },
        },
        orderBy: {
            gameTitle: 'desc'
        },
    })

    return (
        <>
            <main className={'flex flex-col gap-y-6 mt-30 px-3 pb-10 xl:px-0 xl:w-[1280px] xl:mx-auto'}>
                {/*<AlertBasic title={'Announcement'}*/}
                {/*            description={['Effective today, we are removing the account deposit requirement. We realized that requiring a deposit goes against our goal of providing an affordable game rental service.',*/}
                {/*                        'For existing renters who have already paid an account deposit, your deposit will be refunded once your rental period expires.']}*/}
                {/*/>*/}
                {/*<HeroBanner />*/}
                <h1 className={'font-bold text-4xl'}>Browse Games</h1>
                <GamesContainer>
                    {
                        !session?.user &&
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
                                      isGameReleased={game.isGameReleased}
                            />
                        ))
                    }
                    {
                        session?.user &&
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
                                      isGameReleased={game.isGameReleased}
                            />
                        ))
                    }
                </GamesContainer>
                <p className={'text-center text-xs md:text-sm'}>Can&apos;t find your game? <Link href={'https://m.me/1152961824575684'} className={'underline text-blue-500'}>Message us on our Facebook page</Link></p>
            </main>
        </>
    )
}
