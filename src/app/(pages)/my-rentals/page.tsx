import Header from '@/components/Header';
import {GamesContainer} from "@/components/GamesContainer";
import GameCard from "@/components/GameCard";
export default function MyRentalsPage() {
    return (
        <>
            <Header />
            <main>
                <GamesContainer>
                    <GameCard
                        gameDetails={{
                            gameImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/97e9f5fa6e50c185d249956c6f198a2652a9217e69a59ecd.jpg?',
                            gameTitle: 'Spider-Man 2',
                            weeklyPrice: 99,
                            monthlyPrice: 299,
                            trophy: true,
                            nonTrophy: true,
                            renters: 9,
                            availableSlot: 0,
                        }}
                    />
                </GamesContainer>
            </main>
        </>
    )
}