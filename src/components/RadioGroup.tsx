import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

type Props = {
    weeklyPrice: number,
    monthlyPrice: number,
    availableTrophy: number,
    availableNonTrophy: number,
    setSelectedPlan: React.Dispatch<React.SetStateAction<string>>,
    setSelectedAccountPlan: React.Dispatch<React.SetStateAction<string>>,
}
export function RadioGroupChoiceCard({ weeklyPrice, monthlyPrice, availableTrophy, availableNonTrophy, setSelectedPlan, setSelectedAccountPlan }: Props) {
    return (
        <>
             <RadioGroup defaultValue="weekly" className="w-full grid grid-cols-1 md:grid-cols-2" onValueChange={(value) => setSelectedPlan(value)}>
                <FieldLabel htmlFor="weekly-plan">
                    <Field orientation="horizontal" className={'cursor-pointer'}>
                        <FieldContent>
                            <FieldTitle>Speedrunner Plan</FieldTitle>
                            <FieldDescription>For gamers who loves speedrunning or just want to try the game.</FieldDescription>
                            <FieldDescription className={'font-semibold text-blue-600'}>₱{weeklyPrice} per week</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="weekly" id="weekly-plan" />
                    </Field>
                </FieldLabel>
                <FieldLabel htmlFor="monthly-plan">
                    <Field orientation="horizontal" className={'cursor-pointer'}>
                        <FieldContent>
                            <FieldTitle>Casual Dad Plan</FieldTitle>
                            <FieldDescription>For gamers with limited play time but wants to finish the game.</FieldDescription>
                            <FieldDescription className={'font-semibold text-blue-600'}>₱{monthlyPrice} per month</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="monthly" id="monthly-plan" />
                    </Field>
                </FieldLabel>
            </RadioGroup>

            <RadioGroup defaultValue="primary" className="w-full grid grid-cols-1 md:grid-cols-2" onValueChange={(value) => setSelectedAccountPlan(value)}>
                <FieldLabel htmlFor="primary-account">
                    <Field orientation="horizontal" className={'cursor-pointer'}>
                        <FieldContent>
                            <FieldTitle>
                                Primary
                                <Badge variant={availableTrophy !== 0 ? 'outline' : 'destructive'}>{availableTrophy !== 0 ? 'Available' : 'Unavailable'}: {availableTrophy}</Badge>
                            </FieldTitle>
                            <FieldDescription>Progress and achievements on your main account are tracked. Ideal for trophy hunters and completionists.</FieldDescription>
                            <FieldDescription className={'font-semibold text-blue-600'}>+₱50 (One-time)</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="trophy" id="primary-account" disabled={availableTrophy === 0} />
                    </Field>
                </FieldLabel>
                <FieldLabel htmlFor="secondary-account">
                    <Field orientation="horizontal" className={'cursor-pointer'}>
                        <FieldContent>
                            <FieldTitle>
                                Secondary
                                <Badge variant={availableNonTrophy !== 0 ? 'outline' : 'destructive'}>{availableNonTrophy !== 0 ? 'Available' : 'Unavailable'}: {availableNonTrophy}</Badge>
                            </FieldTitle>
                            <FieldDescription>Full game access without restrictions. Simpler experience but no trophy syncing.</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="nonTrophy" id="secondary-account" disabled={availableNonTrophy === 0} />
                    </Field>
                </FieldLabel>
            </RadioGroup>
        </>
    )
}
