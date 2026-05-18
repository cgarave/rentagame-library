'use client'

import Image from 'next/image'
import { DialogCloseButton } from './RentModal'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type GameCardProps = {
    gameDetails: {
        gameImage: string,
        gameTitle: string,
        weeklyPrice: number,
        monthlyPrice: number,
        availableTrophy: number,
        availableNonTrophy: number,
        renters: number,
        availableSlot: number,
    }
}
export default function GameCard({ gameDetails }: GameCardProps) {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0" size={'sm'}>
            <Image src={gameDetails.gameImage} alt={gameDetails.gameTitle} width={500} height={500} className="h-48 w-full object-cover object-top" />
            <Badge variant={'secondary'} className={'absolute top-4 right-4'}>Remaining: 1 day/s</Badge>
            <CardHeader>
                <CardTitle className='text-lg truncate'>{gameDetails.gameTitle}</CardTitle>
                <Badge variant={gameDetails.availableSlot !== 0 ? 'outline' : 'destructive'}>Available slot: {gameDetails.availableSlot ? gameDetails.availableSlot : 0}</Badge>
                <Badge variant="outline">Renters: {gameDetails.renters ? gameDetails.renters : 0}</Badge>
            </CardHeader>
            <CardFooter>
                <DialogCloseButton gameDetails={gameDetails} />
            </CardFooter>
        </Card>
    )
}