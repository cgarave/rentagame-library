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
                            <FieldDescription>Para sa mga gamers na mabilis tumapos ng laro or gusto lang talaga mag try.</FieldDescription>
                            <FieldDescription className={'font-semibold text-blue-600'}>₱{weeklyPrice} per week</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="weekly" id="weekly-plan" />
                    </Field>
                </FieldLabel>
                <FieldLabel htmlFor="monthly-plan">
                    <Field orientation="horizontal" className={'cursor-pointer'}>
                        <FieldContent>
                            <FieldTitle>Casual Plan</FieldTitle>
                            <FieldDescription>Para sa mga kulang sa oras ang paglalaro pero gustong makatapos ng game.</FieldDescription>
                            <FieldDescription className={'font-semibold text-blue-600'}>₱{monthlyPrice} per month</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="monthly" id="monthly-plan" />
                    </Field>
                </FieldLabel>
            </RadioGroup>

            <RadioGroup defaultValue="trophy" className="w-full grid grid-cols-1 md:grid-cols-2" onValueChange={(value) => setSelectedAccountPlan(value)}>
                <FieldLabel htmlFor="primary-account">
                    <Field orientation="horizontal" className={'cursor-pointer'}>
                        <FieldContent>
                            <FieldTitle>
                                Primary
                                <Badge variant={availableTrophy !== 0 ? 'outline' : 'destructive'}>{availableTrophy !== 0 ? 'Available' : 'Unavailable'}: {availableTrophy}</Badge>
                            </FieldTitle>
                            <FieldDescription>Pwede malaro ang game sa main profile, you can also earn trophies and achievements</FieldDescription>
                            <FieldDescription className={'font-semibold text-blue-600'}>+₱50 (One-time payment if you extend your current plan)</FieldDescription>
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
                            <FieldDescription>Malalaro lang ang game sa provided account profile. No trophies, no achievements.</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="nonTrophy" id="secondary-account" disabled={availableNonTrophy === 0} />
                    </Field>
                </FieldLabel>
            </RadioGroup>
        </>
    )
}
