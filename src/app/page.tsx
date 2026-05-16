import Header from '@/components/Header'
import { GamesContainer } from "@/components/GamesContainer";
import GameCard from "@/components/GameCard";
import { mockData} from "@/app/mock.data";

export default function Home() {
    return (
        <>
            <Header />
            <main className={'flex flex-col gap-y-6 mt-30 px-40'}>
                <h1 className={'font-bold text-4xl'}>Browse Games</h1>
                <GamesContainer>
                    {
                        mockData.map(item => (
                            <GameCard key={item.id}
                                gameDetails={{
                                    gameImage: item.gameImage,
                                    gameTitle: item.gameTitle,
                                    weeklyPrice: item.weeklyPrice,
                                    monthlyPrice: item.monthlyPrice,
                                    trophy: item.trophy,
                                    nonTrophy: item.nonTrophy,
                                    availableTrophy: item.availableTrophy,
                                    availableNonTrophy: item.availableNonTrophy,
                                    renters: item.renters,
                                    availableSlot: item.availableSlot,
                                }}
                            />
                        ))
                    }
                </GamesContainer>
            </main>
        </>
    )
}
