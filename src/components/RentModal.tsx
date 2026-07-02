'use client'

import React, { useState } from "react"
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client"

//Components
import { Button } from "@/components/ui/button"
import { RadioGroupChoiceCard} from "@/components/RadioGroup";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from 'sonner'

//Types
import { GameDetails } from "@/types/GameDetails";

//Actions
import { createRentTransaction } from "@/lib/rentTransactionAction";

export function DialogCloseButton({ id, gameImage, gameTitle, weeklyPrice, monthlyPrice, availableTrophy, availableNonTrophy, renters, slot, isGameReleased }: GameDetails) {
    const [selectedPlan, setSelectedPlan] = useState<string>('weekly')
    const [selectedAccountPlan, setSelectedAccountPlan] = useState<string>('trophy')
    const [createTransaction, setCreateTransaction] = useState<boolean>(false)
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
                                rentDeposit: 0,
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
                                rentDeposit: 0,
                                isConfirmed: false,
                                isCancelled: false,
                            })
                            break
                    }
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
                                rentDeposit: 0,
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
                                rentDeposit: 0,
                                isConfirmed: false,
                                isCancelled: false,
                            })
                            break
                    }
                    break
            }
        }
    }

    async function handleClose() {
        if (!id || !session?.user.id) {
            toast.error('You need to sign in first', {
                position: 'top-center',
            });
            return;
        }

        setCreateTransaction(true);

        const transactionPromise = (async () => {
            await handlePayment();

            await new Promise((resolve) => setTimeout(resolve, 2000));

            return 'Transaction created successfully! You will be redirected to our Facebook page shortly.';
        })();

        toast.promise(transactionPromise, {
            loading: 'Processing your request, please wait...',
            success: (message) => {
                setTimeout(() => {
                    router.push('https://m.me/1152961824575684');
                }, 4000)
                return message;
            },
            error: 'Failed to create transaction.',
            position: 'top-center',
            duration: 4000,
        });

        try {
            await transactionPromise;
        } finally {
            setCreateTransaction(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={'w-full cursor-pointer'} variant="default">{isGameReleased == true ? 'Rent Now' : 'Reserve Now'}</Button>
            </DialogTrigger>
            <DialogContent className="h-[36rem] md:h-fit sm:max-w-md md:max-w-xl overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle className={'w-64'}>{gameTitle}</DialogTitle>
                    <DialogDescription>Choose a plan that fits your playstyle.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <div className={'flex flex-row gap-x-2'}>
                        <Badge variant={slot !== 0 ? 'default' : 'destructive'}>Available slot: {slot ? slot : 0}</Badge>
                        <Badge variant="secondary">{isGameReleased ? 'Renters' : 'Reserved'}: {renters ? renters : 0}</Badge>
                    </div>
                    <div className="grid flex-1 gap-2">
                        <RadioGroupChoiceCard
                            weeklyPrice={weeklyPrice!}
                            monthlyPrice={monthlyPrice!}
                            availableTrophy={availableTrophy!}
                            availableNonTrophy={availableNonTrophy!}
                            setSelectedPlan={setSelectedPlan}
                            setSelectedAccountPlan={setSelectedAccountPlan}
                            createTransaction={createTransaction}
                        />
                    </div>
                    <DialogDescription className={'text-xs'}><span className={'font-semibold text-black'}>Mode of Payment:</span> Gcash, Maya, Maribank, Bank Transfer</DialogDescription>
                </div>

                <DialogFooter className="flex justify-end items-center">
                    <DialogTitle>Total: ₱{(selectedPlan === 'weekly' ? weeklyPrice! : monthlyPrice!) + (selectedAccountPlan === 'trophy' ? 50 : 0)}</DialogTitle>
                    <DialogClose asChild>
                        <Button type="button"
                                className={'cursor-pointer'}
                                disabled={createTransaction || slot === 0}
                                onClick={handleClose}>Proceed to Payment
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
