import { Button } from "@/components/ui/button"
import { RadioGroupChoiceCard} from "@/components/RadioGroup";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
type Props = {
    gameDetails: {
        gameImage: string,
        gameTitle: string,
        weeklyPrice: number,
        monthlyPrice: number,
        trophy: boolean,
        nonTrophy: boolean,
        availableTrophy: number,
        availableNonTrophy: number,
        renters: number,
        availableSlot: number,
    }
}
export function DialogCloseButton({ gameDetails }: Props) {
    const [selectedPlan, setSelectedPlan] = useState<string>('weekly')
    const [selectedAccountPlan, setSelectedAccountPlan] = useState<string>('primary')

    function handlePayment() {
        console.log('Payment Test')
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={'w-full cursor-pointer'} variant="default">Rent Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md md:max-w-xl">
                <DialogHeader>
                    <DialogTitle>{gameDetails.gameTitle}</DialogTitle>
                    <DialogDescription>Choose a plan that fits your playstyle.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <div className={'flex flex-row gap-x-2'}>
                        <Badge variant={gameDetails.availableSlot !== 0 ? 'default' : 'destructive'}>Available slot: {gameDetails.availableSlot ? gameDetails.availableSlot : 0}</Badge>
                        <Badge variant="secondary">Renters: {gameDetails.renters ? gameDetails.renters : 0}</Badge>
                    </div>
                    <div className="grid flex-1 gap-2">
                        <RadioGroupChoiceCard
                            weeklyPrice={gameDetails.weeklyPrice}
                            monthlyPrice={gameDetails.monthlyPrice}
                            trophy={gameDetails.trophy}
                            nonTrophy={gameDetails.nonTrophy}
                            availableTrophy={gameDetails.availableTrophy}
                            availableNonTrophy={gameDetails.availableNonTrophy}
                            setSelectedPlan={setSelectedPlan}
                            setSelectedAccountPlan={setSelectedAccountPlan}
                        />
                    </div>
                </div>

                <DialogFooter className="flex justify-end items-center">
                    <DialogTitle>Total: ₱{(selectedPlan === 'weekly' ? gameDetails.weeklyPrice : gameDetails.monthlyPrice) + (selectedAccountPlan === 'primary' ? 50 : 0)}</DialogTitle>
                    <DialogClose asChild>
                        <Button type="button" className={'cursor-pointer'} disabled={gameDetails.availableSlot === 0} onClick={handlePayment}>Proceed to Payment</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
