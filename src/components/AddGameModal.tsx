'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GameDetails } from "@/types/GameDetails";
import { ChangeEvent, useState, ReactNode } from "react"
import { createGame, updateGame } from "@/lib/actions";
import { toast } from 'sonner'

interface ModalDetails {
    modalTitle: string,
    modalDescription?: string,
    inputFields?: [ // not tested yet
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
    gameListTitle?: GameDetails[],
    buttonVariant: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null | undefined;
    buttonIcon?: ReactNode;
    buttonName: string;
    modalDetails: ModalDetails;
    buttonType: "add" | "update";
    game?: GameDetails;
}
export default function AddGameModal({gameListTitle, buttonVariant, buttonIcon, buttonName, modalDetails, buttonType, game}: Props) {
    //asChild meaning handle as child yung component instead yung default

    const [inputFieldsToAddGame, setInputFieldsToAddGame] = useState<GameDetails>({
        gameImage: '',
        gameTitle: '',
        weeklyPrice: 0,
        monthlyPrice: 0,
        availableTrophy: 0,
        availableNonTrophy: 0,
        renters: 0,
        slot: 0,
    } as GameDetails)

    const newMap = gameListTitle?.flatMap(game => {
        return Object.values(game)[2].toLowerCase()
    })

    async function addGameFunction() {
        if (inputFieldsToAddGame.gameImage !== ''
            && inputFieldsToAddGame.gameTitle !== ''
            && !newMap?.includes(inputFieldsToAddGame.gameTitle.toLowerCase())
            && inputFieldsToAddGame.weeklyPrice
            && inputFieldsToAddGame.monthlyPrice
            && inputFieldsToAddGame.availableTrophy
            && inputFieldsToAddGame.availableNonTrophy
            && inputFieldsToAddGame.slot) {
            // await fetch('/api/games/', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         gameImage: inputFieldsToAddGame.gameImage,
            //         gameTitle: inputFieldsToAddGame.gameTitle,
            //         weeklyPrice: inputFieldsToAddGame.weeklyPrice,
            //         monthlyPrice: inputFieldsToAddGame.monthlyPrice,
            //         availableTrophy: inputFieldsToAddGame.availableTrophy,
            //         availableNonTrophy: inputFieldsToAddGame.availableNonTrophy,
            //         slot: inputFieldsToAddGame.slot,
            //     } as GameDetails)
            // })
            await createGame({
                gameImage: inputFieldsToAddGame.gameImage,
                gameTitle: inputFieldsToAddGame.gameTitle,
                weeklyPrice: inputFieldsToAddGame.weeklyPrice,
                monthlyPrice: inputFieldsToAddGame.monthlyPrice,
                availableTrophy: inputFieldsToAddGame.availableTrophy,
                availableNonTrophy: inputFieldsToAddGame.availableNonTrophy,
                slot: inputFieldsToAddGame.slot,
            })
            toast.success('Game Added!', { position: 'top-center' })
        } else {
            toast.error('Something went wrong!', { position: 'top-center' })
            return null
        }
    }
    async function updateGameFunction() {
        if(inputFieldsToAddGame.id && inputFieldsToAddGame.gameImage !== '' && inputFieldsToAddGame.gameTitle !== '' && !newMap?.includes(inputFieldsToAddGame.gameTitle.toLowerCase())) {
            await updateGame(
                inputFieldsToAddGame.id,
                {
                    gameImage: inputFieldsToAddGame.gameImage,
                    gameTitle: inputFieldsToAddGame.gameTitle,
                    weeklyPrice: inputFieldsToAddGame.weeklyPrice,
                    monthlyPrice: inputFieldsToAddGame.monthlyPrice,
                    availableTrophy: inputFieldsToAddGame.availableTrophy,
                    availableNonTrophy: inputFieldsToAddGame.availableNonTrophy,
                    slot: inputFieldsToAddGame.slot,
                }
            )
            toast.success('Game has been updated!', { position: 'top-center' })
        } else {
            toast.error('Something went wrong!', { position: 'top-center' })
            return null
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant={buttonVariant}
                            className={'w-full justify-start'}
                            //to avoid type checking error when using optional prop on reusable components, use && to confirm that game has
                            onClick={ buttonType === 'update' && game ? () => setInputFieldsToAddGame(game) : buttonType === 'add' ? () => setInputFieldsToAddGame({
                                gameImage: '',
                                gameTitle: '',
                                weeklyPrice: 0,
                                monthlyPrice: 0,
                                availableTrophy: 0,
                                availableNonTrophy: 0,
                                slot: 0,
                            } as GameDetails) : undefined } 
                    >
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
                            <Input id="game-link" name="game-link" autoComplete={'off'} placeholder={'ex. https://image.api.playstation.com/'}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setInputFieldsToAddGame({...inputFieldsToAddGame, gameImage: e.target.value })}
                                   value={inputFieldsToAddGame.gameImage}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="game-title">Game Title</Label>
                            <Input id="game-title" name="game-title" autoComplete={'off'} placeholder={'ex. Spider-Man'}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setInputFieldsToAddGame({...inputFieldsToAddGame, gameTitle: e.target.value })}
                                   value={inputFieldsToAddGame.gameTitle}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="slot">Slot</Label>
                            <Input id="slot" name="slot" type={'number'} placeholder={'0'} min={0}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setInputFieldsToAddGame({...inputFieldsToAddGame, slot: Number(e.target.value) })}
                                   value={inputFieldsToAddGame.slot}
                            />
                        </Field>
                        <FieldGroup className={'flex flex-row gap-x-2'}>
                            <Field>
                                <Label htmlFor="weekly-price">Weekly Price</Label>
                                <Input id="weekly-price" name="weekly-price" type={'number'} placeholder={'0'} min={0}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => setInputFieldsToAddGame({...inputFieldsToAddGame, weeklyPrice: Number(e.target.value) })}
                                       value={inputFieldsToAddGame.weeklyPrice}
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="monthly-price">Monthly Price</Label>
                                <Input id="monthly-price" name="monthly-price" type={'number'} placeholder={'0'} min={0}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => setInputFieldsToAddGame({...inputFieldsToAddGame, monthlyPrice: Number(e.target.value) })}
                                       value={inputFieldsToAddGame.monthlyPrice}
                                />
                            </Field>
                        </FieldGroup>
                        <FieldGroup className={'flex flex-row gap-x-2'}>
                            <Field>
                                <Label htmlFor="primaryCount">Available Primary</Label>
                                <Input id="primaryCount" name="primaryCount" type={'number'} placeholder={'0'} min={0}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => setInputFieldsToAddGame({...inputFieldsToAddGame, availableTrophy: Number(e.target.value) })}
                                       value={inputFieldsToAddGame.availableTrophy}
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="secondaryCount">Available Secondary</Label>
                                <Input id="secondaryCount" name="secondaryCount" type={'number'} placeholder={'0'} min={0}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => setInputFieldsToAddGame({...inputFieldsToAddGame, availableNonTrophy: Number(e.target.value) })}
                                       value={inputFieldsToAddGame.availableNonTrophy}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">{modalDetails.closeButtonName}</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" onClick={buttonType === 'add' ? addGameFunction : updateGameFunction}>{modalDetails.submitButtonName}</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
