'use client'

import { PencilIcon, TrashIcon } from "lucide-react"
import AddGameModal from "@/components/AddGameModal";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GameDetails } from "@/types/GameDetails";
import { deleteGame } from "@/lib/actions";

export function DropdownMenuComponent({ inputFieldsToAddGame, setInputFieldsToAddGame, game }: {inputFieldsToAddGame: GameDetails, setInputFieldsToAddGame: React.Dispatch<React.SetStateAction<GameDetails>>, game: GameDetails} ) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <AddGameModal
                        buttonVariant={'ghost'}
                        buttonIcon={<PencilIcon/>}
                        buttonName={'Edit Details'}
                        modalDetails={{
                            modalTitle: 'Edit Game Details',
                            modalDescription: '',
                            closeButtonName: 'Discard',
                            submitButtonName: 'Update',
                        }}
                        buttonType={'update'}
                        inputFieldsToAddGame={inputFieldsToAddGame}
                        setInputFieldsToAddGame={setInputFieldsToAddGame}
                        game={game}
                    />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive" onClick={() => deleteGame(game.id)}>
                        <TrashIcon />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
