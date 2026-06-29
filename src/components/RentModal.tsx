'use client'

import { Button } from "@/components/ui/button"
import { RadioGroupChoiceCard} from "@/components/RadioGroup";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { GameDetails } from "@/types/GameDetails";
import { createRentTransaction } from "@/lib/rentTransactionAction";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client"
import { toast } from 'sonner'

export function DialogCloseButton({ id, gameImage, gameTitle, weeklyPrice, monthlyPrice, availableTrophy, availableNonTrophy, renters, slot }: GameDetails) {
    const [selectedPlan, setSelectedPlan] = useState<string>('weekly')
    const [selectedAccountPlan, setSelectedAccountPlan] = useState<string>('trophy')
    const {data: session} = useSession()
    const router = useRouter()

    async function handlePayment() {
        if (id
            && session?.user.id
            ){
            switch (selectedPlan){
                case 'weekly':
                    switch (selectedAccountPlan){
                        case 'trophy':
                            await createRentTransaction({
                                userId: session?.user.id,
                                gameId: id,
                                rentType: "WEEKLY",
                                accountPlan: "TROPHY",
                                rentPayment: weeklyPrice! + 50,
                                rentDeposit: 150,
                                isConfirmed: false,
                                isCancelled: false,
                            })
                            break
                        case 'nonTrophy':
                            await createRentTransaction({
                                userId: session?.user.id,
                                gameId: id,
                                rentType: "WEEKLY",
                                accountPlan: "NONTROPHY",
                                rentPayment: weeklyPrice!,
                                rentDeposit: 150,
                                isConfirmed: false,
                                isCancelled: false,
                            })
                            break
                    }
                    router.push('https://m.me/1152961824575684')
                    break
                case 'monthly':
                    switch (selectedAccountPlan){
                        case 'trophy':
                            await createRentTransaction({
                                userId: session?.user.id,
                                gameId: id,
                                rentType: "MONTHLY",
                                accountPlan: "TROPHY",
                                rentPayment: monthlyPrice! + 50,
                                rentDeposit: 150,
                                isConfirmed: false,
                                isCancelled: false,
                            })
                            break
                        case 'nonTrophy':
                            await createRentTransaction({
                                userId: session?.user.id,
                                gameId: id,
                                rentType: "MONTHLY",
                                accountPlan: "NONTROPHY",
                                rentPayment: monthlyPrice!,
                                rentDeposit: 150,
                                isConfirmed: false,
                                isCancelled: false,
                            })
                            break
                    }
                    router.push('https://m.me/1152961824575684')
                    break
            }
        } else {
            toast.error('You need to sign in first', { position: 'top-center' })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={'w-full cursor-pointer'} variant="default">Rent Now</Button>
            </DialogTrigger>
            <DialogContent className="h-[36rem] md:h-fit sm:max-w-md md:max-w-xl overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle className={'w-64'}>{gameTitle}</DialogTitle>
                    <DialogDescription>Choose a plan that fits your playstyle.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <div className={'flex flex-row gap-x-2'}>
                        <Badge variant={slot !== 0 ? 'default' : 'destructive'}>Available slot: {slot ? slot : 0}</Badge>
                        <Badge variant="secondary">Renters: {renters ? renters : 0}</Badge>
                    </div>
                    <div className="grid flex-1 gap-2">
                        <RadioGroupChoiceCard
                            weeklyPrice={weeklyPrice!}
                            monthlyPrice={monthlyPrice!}
                            availableTrophy={availableTrophy!}
                            availableNonTrophy={availableNonTrophy!}
                            setSelectedPlan={setSelectedPlan}
                            setSelectedAccountPlan={setSelectedAccountPlan}
                        />
                    </div>
                    <DialogDescription className={'text-xs'}><span className={'font-semibold text-black'}>Mode of Payment:</span> Gcash, Maya, Maribank, Bank Transfer</DialogDescription>
                    <DialogDescription className={'text-xs'}>Clicking <span className={'font-semibold text-black'}>Proceed to Payment</span> will redirect you to our Facebook page messenger to continue the payment.</DialogDescription>
                </div>

                <DialogFooter className="flex justify-end items-center">
                    <DialogTitle>Total: ₱{(selectedPlan === 'weekly' ? weeklyPrice! : monthlyPrice!) + (selectedAccountPlan === 'trophy' ? 50 : 0)}</DialogTitle>
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
