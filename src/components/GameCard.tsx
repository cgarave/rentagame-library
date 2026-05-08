'use client'
import Image from 'next/image'
import Button from "@/components/Button";
type RentalDetails = {
    gameTitle: string
    weeklyPlanPrice: number
    monthlyPlanPrice: number
    trophyAvailability: boolean
    nonTrophyAvailability: boolean
}
type GameCardProps = {
    setModalOpen: (value: boolean) => void,
    setRentalDetails: React.Dispatch<React.SetStateAction<RentalDetails>>,
    gameDetails: {
        gameImage: string,
        gameTitle: string,
        weeklyPrice: number,
        monthlyPrice: number,
        trophy: boolean,
        nonTrophy: boolean,
        renters: number,
        availableSlot: number,
    }
}
export default function GameCard({ setModalOpen, setRentalDetails, gameDetails }: GameCardProps) {
    return (
        <div className="bg-zinc-900 p-4 rounded-lg flex flex-col gap-y-2 text-sm border border-gray-500">
            <Image src={gameDetails.gameImage} alt={gameDetails.gameTitle} width={500} height={500} className="rounded-lg w-full" />
            <h1 className="font-semibold text-lg truncate">{gameDetails.gameTitle}</h1>
            <p>{gameDetails.weeklyPrice}/7 days</p>
            <p>{gameDetails.monthlyPrice}/month</p>
            <p>Primary: {gameDetails.trophy ? 'available' : 'unavailable'}</p>
            <p>Secondary: {gameDetails.nonTrophy ? 'available' : 'unavailable'}</p>
            <p>Renters: {gameDetails.renters ? gameDetails.renters : 0}</p>
            <p>Slot: {gameDetails.availableSlot ? gameDetails.availableSlot : 0}</p>
            <Button buttonName={'Rent Now'} onButtonClick={() => {
                setModalOpen(true)
                setRentalDetails({
                    gameTitle: gameDetails.gameTitle,
                    weeklyPlanPrice: gameDetails.weeklyPrice,
                    monthlyPlanPrice: gameDetails.monthlyPrice,
                    trophyAvailability: gameDetails.trophy,
                    nonTrophyAvailability: gameDetails.nonTrophy,
                })
            }} />
        </div>
    )
}