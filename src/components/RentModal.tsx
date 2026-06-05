'use client'

import { Button } from "@/components/ui/button"
import { RadioGroupChoiceCard} from "@/components/RadioGroup";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { GameDetails } from "@/types/GameDetails";
import { updateGame } from "@/lib/actions";

export function DialogCloseButton({ id, gameImage, gameTitle, weeklyPrice, monthlyPrice, availableTrophy, availableNonTrophy, renters, slot }: GameDetails) {
    const [selectedPlan, setSelectedPlan] = useState<string>('weekly')
    const [selectedAccountPlan, setSelectedAccountPlan] = useState<string>('primary')

    async function handlePayment() {
        if (id) await updateGame(id, {
            renters: renters + 1,
            slot: slot - 1,
        })
        // if (id) await updateGame(id, {
        //     renters: 0,
        //     slot: 1,
        // })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={'w-full cursor-pointer'} variant="default">Rent Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md md:max-w-xl">
                <DialogHeader>
                    <DialogTitle>{gameTitle}</DialogTitle>
                    <DialogDescription>Choose a plan that fits your playstyle.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <div className={'flex flex-row gap-x-2'}>
                        <Badge variant={slot !== 0 ? 'default' : 'destructive'}>Available slot: {slot ? slot : 0}</Badge>
                        <Badge variant="secondary">Renters: {renters ? renters : 0}</Badge>
                    </div>
                    <div className="grid flex-1 gap-2">
                        <RadioGroupChoiceCard
                            weeklyPrice={weeklyPrice}
                            monthlyPrice={monthlyPrice}
                            availableTrophy={availableTrophy}
                            availableNonTrophy={availableNonTrophy}
                            setSelectedPlan={setSelectedPlan}
                            setSelectedAccountPlan={setSelectedAccountPlan}
                        />
                    </div>
                </div>

                <DialogFooter className="flex justify-end items-center">
                    <DialogTitle>Total: ₱{(selectedPlan === 'weekly' ? weeklyPrice : monthlyPrice) + (selectedAccountPlan === 'primary' ? 50 : 0)}</DialogTitle>
                    <DialogClose asChild>
                        <Button type="button" 
                                className={'cursor-pointer'} 
                                disabled={slot === 0} 
                                onClick={handlePayment}>Proceed to Payment</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
