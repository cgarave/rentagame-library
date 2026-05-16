import Header from '@/components/Header';
import {GamesContainer} from "@/components/GamesContainer";
import GameCard from "@/components/GameCard";
export default function MyRentalsPage() {
    return (
        <>
            <Header />
            <main className={'flex flex-col gap-y-6 mt-30 px-40'}>
                <h1 className={'font-bold text-4xl'}>My Rentals</h1>
                <GamesContainer>
                    <GameCard
                        gameDetails={{
                            gameImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202507/0215/f98041a10ccc22d45fc2f6eded09eec50abd106d01547a5d.png',
                            gameTitle: '007: First Light',
                            weeklyPrice: 149,
                            monthlyPrice: 459,
                            trophy: true,
                            nonTrophy: true,
                            availableTrophy: 7,
                            availableNonTrophy: 10,
                            renters: 3,
                            availableSlot: 17,
                        }}
                    />
                </GamesContainer>
            </main>
        </>
    )
}