'use client'
import {Fragment, useState} from "react";
import {GameDetails} from "@/types/GameDetails";
import { UserRentals } from "@/types/UserRentals";
import { User } from "@/types/User";
import { Plus, Users, List, ChevronRight } from "lucide-react"
import AddGameModal from "@/components/AddGameModal";
import { Button } from "@/components/ui/button"
import { DropdownMenuComponent } from "@/components/DropdownMenu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DashboardList({ games, users, userRentals }: { games: GameDetails[], users: User[], userRentals: UserRentals[] }) {
    const [list, setList] = useState('gameList')
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [viewGames, setViewGames] = useState<boolean>(false)
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
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>isAdmin</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            // userRentals.map((userRental: UserRentals) => (
                            //     <>
                            //         <TableRow key={userRental.id}>
                            //             <TableCell className={'font-semibold'}>{userRental.user.id}</TableCell>
                            //             <TableCell className={'font-semibold'}>{userRental.user.name}</TableCell>
                            //             <TableCell>{userRental.user.email}</TableCell>
                            //             <TableCell>{String(userRental.user.isAdmin)}</TableCell>
                            //             <TableCell>{String(userRental.user.createdAt)}</TableCell>
                            //         </TableRow>
                            //         <TableRow key={userRental.game.id}>
                            //             <TableCell>{userRental.game.gameTitle}</TableCell>
                            //             <TableCell>{userRental.rentType}</TableCell>
                            //         </TableRow>
                            //     </>
                            // ))

                            users.map((user: User) => (
                                <Fragment key={user.id}>
                                    <TableRow key={user.id} onClick={() => setViewGames(!viewGames)}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{String(user.isAdmin)}</TableCell>
                                        <TableCell>{`${month[user.createdAt.getMonth()]} ${user.createdAt.getDate()}, ${user.createdAt.getFullYear()}`}</TableCell>
                                        <TableCell colSpan={2} align={'right'}>
                                            <ChevronRight size={'16'}/>
                                        </TableCell>
                                    </TableRow>
                                    {
                                        userRentals.map((userRental: UserRentals) => (
                                            user.id === userRental.user.id && viewGames &&
                                            <TableRow key={userRental.game.id}>
                                                <TableCell>{userRental.game.gameTitle}</TableCell>
                                                <TableCell>{userRental.rentType}</TableCell>
                                                <TableCell>{userRental.status}</TableCell>
                                                <TableCell>{userRental.accountPlan}</TableCell>
                                                <TableCell>{`${month[userRental.createdAt.getMonth()]} ${userRental.createdAt.getDate()}, ${userRental.createdAt.getFullYear()}`}</TableCell>
                                                <TableCell>{`${month[userRental.expiresAt.getMonth()]} ${userRental.expiresAt.getDate()}, ${userRental.expiresAt.getFullYear()}`}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </Fragment>
                            ))
                        }
                    </TableBody>
                </Table>
            }
        </>
    )
}