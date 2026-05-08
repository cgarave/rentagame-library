'use client'
import { useState } from 'react'
import GameCard from "@/components/GameCard";
import PlaceOrderModal from "@/components/PlaceOrderModal";
export const GamesContainer = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [rentalDetails, setRentalDetails] = useState({
        gameTitle: "",
        weeklyPlanPrice: 0,
        monthlyPlanPrice: 0,
        trophyAvailability: true,
        nonTrophyAvailability: true,
    })
    return (
        <>
            <PlaceOrderModal modalOpen={modalOpen} rentalDetails={rentalDetails} />
            <div className="mt-20 grid grid-cols-5 gap-3 px-40">
                <GameCard
                    setModalOpen={setModalOpen}
                    setRentalDetails={setRentalDetails}
                    gameDetails={{
                        gameImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202501/2217/e5833a53529ff9879e87689f1e8b04d45ba7e6c97fa791e2.png',
                        gameTitle: 'Clair Obscur: Expedition 33',
                        weeklyPrice: 149,
                        monthlyPrice: 459,
                        trophy: true,
                        nonTrophy: false,
                        renters: 0,
                        availableSlot: 1, }}
                />
                <GameCard
                    setModalOpen={setModalOpen}
                    setRentalDetails={setRentalDetails}
                    gameDetails={{
                        gameImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/97e9f5fa6e50c185d249956c6f198a2652a9217e69a59ecd.jpg?',
                        gameTitle: 'Spider-Man 2',
                        weeklyPrice: 149,
                        monthlyPrice: 459,
                        trophy: true,
                        nonTrophy: false,
                        renters: 0,
                        availableSlot: 1, }}
                />
            </div>
        </>
    )
}