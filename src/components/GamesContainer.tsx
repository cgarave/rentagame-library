import GameCard from "@/components/GameCard";

export const GamesContainer = () => {
    return (
        <>
            <div className="mt-20 grid grid-cols-5 gap-3 px-40">
                <GameCard
                    gameDetails={{
                        gameImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202501/2217/e5833a53529ff9879e87689f1e8b04d45ba7e6c97fa791e2.png',
                        gameTitle: 'Clair Obscur: Expedition 33',
                        weeklyPrice: 149,
                        monthlyPrice: 459,
                        trophy: true,
                        nonTrophy: true,
                        renters: 2,
                        availableSlot: 8,
                    }}
                />
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
            </div>
        </>
    )
}