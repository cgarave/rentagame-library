import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
interface ModalDetails {
    modalTitle: string,
    modalDescription?: string,
    inputFields?: [
        {
            inputFieldName: string,
            placeholder: string,
            type: 'number' | null,
        },
    ],
    closeButtonName: string,
    submitButtonName: string,
}
type Props = {
    buttonVariant: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null | undefined;
    buttonIcon?: React.ReactNode;
    buttonName: string;
    modalDetails: ModalDetails;
}
export default function AddGameModal({buttonVariant, buttonIcon, buttonName, modalDetails}: Props) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant={buttonVariant} className={'w-full justify-start'}>
                        {buttonIcon}
                        {buttonName}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{modalDetails.modalTitle}</DialogTitle>
                        <DialogDescription>
                            {modalDetails.modalDescription}
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="game-link">Image Link</Label>
                            <Input id="game-link" name="game-link" autoComplete={'off'} placeholder={'ex. https://image.api.playstation.com/'} />
                        </Field>
                        <Field>
                            <Label htmlFor="game-title">Game Title</Label>
                            <Input id="game-title" name="game-title" autoComplete={'off'} placeholder={'ex. Spider-Man'} />
                        </Field>
                        <Field>
                            <Label htmlFor="slot">Slot</Label>
                            <Input id="slot" name="slot" type={'number'} placeholder={'0'} min={0} />
                        </Field>
                        <FieldGroup className={'flex flex-row gap-x-2'}>
                            <Field>
                                <Label htmlFor="weekly-price">Weekly Price</Label>
                                <Input id="weekly-price" name="weekly-price" type={'number'} placeholder={'0'} min={0}/>
                            </Field>
                            <Field>
                                <Label htmlFor="monthly-price">Monthly Price</Label>
                                <Input id="monthly-price" name="monthly-price" type={'number'} placeholder={'0'} min={0}/>
                            </Field>
                        </FieldGroup>
                        <FieldGroup className={'flex flex-row gap-x-2'}>
                            <Field>
                                <Label htmlFor="primaryCount">Available Primary</Label>
                                <Input id="primaryCount" name="primaryCount" type={'number'} placeholder={'0'} min={0}/>
                            </Field>
                            <Field>
                                <Label htmlFor="secondaryCount">Available Secondary</Label>
                                <Input id="secondaryCount" name="secondaryCount" type={'number'} placeholder={'0'} min={0}/>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">{modalDetails.closeButtonName}</Button>
                        </DialogClose>
                        <Button type="submit">{modalDetails.submitButtonName}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
