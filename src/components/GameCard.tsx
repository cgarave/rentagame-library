import Image from 'next/image'
import { DialogCloseButton } from './RentModal'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GameDetails } from '@/types/GameDetails'

export default function GameCard({ id, gameImage, gameTitle, weeklyPrice, monthlyPrice, availableTrophy, availableNonTrophy, renters, slot }: GameDetails) {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0" size={'sm'}>
            <Image src={gameImage} alt={gameTitle} width={500} height={500} className="h-48 w-full object-cover object-top" />
            <Badge variant={'secondary'} className={'absolute top-4 right-4'}>Remaining: 1 day/s</Badge>
            <CardHeader>
                <CardTitle className='text-lg truncate'>{gameTitle}</CardTitle>
                <Badge variant={slot !== 0 ? 'outline' : 'destructive'}>Available slot: {slot ? slot : 0}</Badge>
                <Badge variant="outline">Renters: {renters ? renters : 0}</Badge>
            </CardHeader>
            <CardFooter>
                <DialogCloseButton  id={id}
                                    gameImage={gameImage}
                                    gameTitle={gameTitle}
                                    weeklyPrice={weeklyPrice}
                                    monthlyPrice={monthlyPrice}
                                    availableTrophy={availableTrophy}
                                    availableNonTrophy={availableNonTrophy}
                                    renters={renters}
                                    slot={slot} />
            </CardFooter>
        </Card>
    )
}