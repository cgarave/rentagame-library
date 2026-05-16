'use client'
import { PencilIcon, TrashIcon } from "lucide-react"
import AddGameModal from "@/components/AddGameModal";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function DropdownMenuComponent() {
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
                            submitButtonName: 'Save',
                        }}
                    />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                        <TrashIcon />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
