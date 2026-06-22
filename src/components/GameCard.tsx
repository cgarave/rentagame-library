import Image from 'next/image'
import { DialogCloseButton } from './RentModal'
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GameDetails } from '@/types/GameDetails'

export default function GameCard({ id, gameImage, gameTitle, weeklyPrice, monthlyPrice, availableTrophy, availableNonTrophy, renters, slot, includeButton, includeBadge, expiresAt }: GameDetails) {

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0" size={'sm'}>
            <Image src={gameImage} alt={gameTitle} width={500} height={500} className="h-28 md:h-48 w-full object-cover object-top" />
            {
                includeBadge && <Badge variant={'secondary'} className={'absolute top-4 right-4'}>Expires at: {expiresAt}</Badge>
            }
            <CardHeader>
                <CardTitle className='text-sm md:text-lg truncate'>{gameTitle}</CardTitle>
                {slot || slot == 0 ? <Badge variant={slot !== 0 ? 'outline' : 'destructive'}>Available slot: {slot ? slot : 0}</Badge> : null}
                {renters || renters == 0 ? <Badge variant="outline">Renters: {renters ? renters : 0}</Badge> : null}
            </CardHeader>
            {
                includeButton && (
                    <CardFooter className={'flex flex-col gap-y-2'}>
                        <DialogCloseButton  id={id}
                                            gameImage={gameImage}
                                            gameTitle={gameTitle}
                                            weeklyPrice={weeklyPrice}
                                            monthlyPrice={monthlyPrice}
                                            availableTrophy={availableTrophy}
                                            availableNonTrophy={availableNonTrophy}
                                            renters={renters}
                                            slot={slot}
                        />
                        {weeklyPrice && <Badge variant={"ghost"} className={'mx-auto text-zinc-500'}>Starts at ₱{weeklyPrice} per week</Badge>}
                    </CardFooter>
                )
            }
        </Card>
    )
}