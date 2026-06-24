'use client'
import { useState } from "react";
import {GameDetails} from "@/types/GameDetails";
import { UserRentals } from "@/types/UserRentals";
import { Plus, Users, List } from "lucide-react"
import AddGameModal from "@/components/AddGameModal";
import { Button } from "@/components/ui/button"
import { DropdownMenuComponent } from "@/components/DropdownMenu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function GameList({ games, userRentals }: { games: GameDetails[], userRentals: UserRentals[] }) {
    const [list, setList] = useState('gameList')

    return (
        <>
            <div className={'flex flex-row justify-between'}>
                <div className={'flex flex-row gap-x-2'}>
                    <Button type={"button"} variant={"outline"} onClick={() => setList("gameList")}>
                        <List />
                        View Games
                    </Button>
                    <Button type={"button"} variant={"outline"} onClick={() => setList("userList")}>
                        <Users />
                        View Renters
                    </Button>
                </div>
                <AddGameModal
                    buttonVariant={'default'}
                    buttonIcon={<Plus/>}
                    buttonName={'Add Game'}
                    modalDetails={{
                        modalTitle: 'Add New Game',
                        modalDescription: 'Added game will be added to the list',
                        closeButtonName: 'Cancel',
                        submitButtonName: 'Add Game',
                    }}
                    buttonType={'add'}
                />
            </div>
            {list === 'gameList' &&
                <Table className={'mx-auto border'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Game Title</TableHead>
                            <TableHead>Current Renters</TableHead>
                            <TableHead>Available Slots</TableHead>
                            <TableHead>Weekly Price</TableHead>
                            <TableHead>Monthly Price</TableHead>
                            <TableHead>Available Primary</TableHead>
                            <TableHead>Available Secondary</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            games.map((game: GameDetails) => (
                                <TableRow key={game.id}>
                                    <TableCell className={'font-semibold'}>{game.gameTitle}</TableCell>
                                    <TableCell>{game.renters}</TableCell>
                                    <TableCell>{game.slot}</TableCell>
                                    <TableCell>{game.weeklyPrice}</TableCell>
                                    <TableCell>{game.monthlyPrice}</TableCell>
                                    <TableCell>{game.availableTrophy}</TableCell>
                                    <TableCell>{game.availableNonTrophy}</TableCell>
                                    <TableCell>
                                        <DropdownMenuComponent game={game}/>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            }
            {
                list === 'userList' &&
                <Table className={'mx-auto border'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User Id</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>isAdmin</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Rentals</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            userRentals.map((userRental: UserRentals) => (
                                <TableRow key={userRental.id}>
                                    <TableCell className={'font-semibold'}>{userRental.user.id}</TableCell>
                                    <TableCell className={'font-semibold'}>{userRental.user.name}</TableCell>
                                    <TableCell>{userRental.user.email}</TableCell>
                                    <TableCell>{String(userRental.user.isAdmin)}</TableCell>
                                    <TableCell>{String(userRental.user.createdAt)}</TableCell>
                                    <TableCell>{userRental.game.gameTitle}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            }
        </>
    )
}