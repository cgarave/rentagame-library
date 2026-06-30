'use client'
import {Fragment, useState} from "react";
import { Plus, Users, List, ChevronRight, FileText } from "lucide-react"
import AddGameModal from "@/components/AddGameModal";
import { Button } from "@/components/ui/button"
import { DropdownMenuComponent } from "@/components/DropdownMenu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

//Types
import {GameDetails} from "@/types/GameDetails";
import { UserRentals } from "@/types/UserRentals";
import { User } from "@/types/User";

//Actions
import {updateGame, createRental, deleteUserRental} from "@/lib/actions";
import {UserTransaction} from "@/types/UserTransaction";
import { confirmRentTransaction, cancelRentTransaction } from "@/lib/rentTransactionAction";

function UserTableRow({user, userRentals}: {user: User, userRentals: UserRentals[]}) {
    const [viewGames, setViewGames] = useState<boolean>(false)
    return (
        <Fragment key={user.id}>
            <TableRow key={user.id} className={'cursor-pointer'} onClick={() => setViewGames(!viewGames)}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{String(user.isAdmin)}</TableCell>
                <TableCell>{user.createdAt.toLocaleString('en-US', {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                })}</TableCell>
                <TableCell colSpan={3} align={'right'}>
                    <ChevronRight size={'16'} className={`transition-all duration-300 ease-in-out ${viewGames ? 'rotate-90' : 'rotate-0'}`} />
                </TableCell>
            </TableRow>
            {
                user.id && viewGames && (
                    <TableRow className={'bg-zinc-200 hover:bg-zinc-200'}>
                        <TableHead>Games</TableHead>
                        <TableHead>Rent Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Profile Plan</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead colSpan={2}>Expire Date</TableHead>
                    </TableRow>
                )
            }
            {
                userRentals.map((userRental: UserRentals) => (
                    user.id === userRental.user.id && viewGames &&
                    <TableRow key={userRental.game.id} className={'bg-zinc-100 hover:bg-zinc-100'}>
                        <TableCell>{userRental.game.gameTitle}</TableCell>
                        <TableCell>{userRental.rentType}</TableCell>
                        <TableCell>{userRental.status}</TableCell>
                        <TableCell>{userRental.accountPlan}</TableCell>
                        <TableCell>{userRental.createdAt.toLocaleString('en-US', {
                            weekday: "short",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                        })}</TableCell>
                        <TableCell>{userRental.expiresAt.toLocaleString('en-US', {
                            weekday: "short",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                        })}</TableCell>
                        <TableCell>
                            <Button variant={'destructive'} onClick={() => userRental.id ? deleteUserRental(userRental.id) : null}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))
            }
        </Fragment>
    )
}

function UserTransactionTableRow({ userTransaction }: {userTransaction: UserTransaction}) {

    async function createRentOnceConfirmed(userTransaction: UserTransaction) {
        if(userTransaction.id && userTransaction.user.id && userTransaction.game.id) {
            await confirmRentTransaction(userTransaction.id, {
                isConfirmed: true
            })
            await createRental({
                userId: userTransaction.user.id,
                gameId: userTransaction.game.id,
                status: "ACTIVE",
                rentType: userTransaction.rentType,
                accountPlan: userTransaction.accountPlan
            })
            // await updateGame(userTransaction.game.id, {
            //     availableTrophy: availableTrophy! - 1,
            //     renters: renters! + 1,
            //     slot: slot! - 1,
            // })
        }
    }

    return (
        <TableRow key={userTransaction.id}>
            <TableCell>{userTransaction.user.name}</TableCell>
            <TableCell>{userTransaction.user.email}</TableCell>
            <TableCell>{userTransaction.game.gameTitle}</TableCell>
            <TableCell>{userTransaction.rentType}</TableCell>
            <TableCell>{userTransaction.accountPlan}</TableCell>
            <TableCell>{userTransaction.rentPayment}</TableCell>
            <TableCell>{userTransaction.rentDeposit}</TableCell>
            <TableCell>{userTransaction.createdAt.toLocaleString('en-US', {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })}</TableCell>
            <TableCell className={'flex flex-row gap-x-4'}>
                {
                    !userTransaction.isConfirmed && !userTransaction.isCancelled ?
                    <>
                        <Button onClick={() => userTransaction ? createRentOnceConfirmed(userTransaction) : null}>Confirm Transaction</Button>
                        <Button variant={'destructive'} onClick={() => userTransaction.id ? cancelRentTransaction(userTransaction.id, {
                            isCancelled: true
                        }) : null}>Cancel</Button>
                    </>
                    : userTransaction.isConfirmed ?
                        <p className={'text-green-700 font-semibold'}>Transaction Confirmed</p>
                    : userTransaction.isCancelled ?
                        <p className={'text-zinc-500 font-semibold'}>Transaction Cancelled</p>
                    : null
                }
            </TableCell>
        </TableRow>
    )
}

export default function DashboardList({ games, users, userRentals, userTransactions }: { games: GameDetails[], users: User[], userRentals: UserRentals[], userTransactions: UserTransaction[] }) {
    const [list, setList] = useState('gameList')
    return (
        <>
            <div className={'flex flex-row justify-between'}>
                <div className={'flex flex-row gap-x-2'}>
                    <Button type={"button"} variant={"outline"} className={list === 'gameList' ? 'border border-blue-600 text-blue-600 hover:text-blue-600' : ''}  onClick={() => setList("gameList")}>
                        <List />
                        View Games
                    </Button>
                    <Button type={"button"} variant={"outline"} className={list === 'userList' ? 'border border-blue-600 text-blue-600 hover:text-blue-600' : ''} onClick={() => setList("userList")}>
                        <Users />
                        View Renters
                    </Button>
                    <Button type={"button"} variant={"outline"} className={list === 'transactionHistoryList' ? 'border border-blue-600 text-blue-600 hover:text-blue-600' : ''} onClick={() => setList("transactionHistoryList")}>
                        <FileText />
                        Transaction History
                    </Button>
                </div>
                {
                    list === 'gameList' &&
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
                }
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
                            users.map((user: User) => (
                                <UserTableRow key={user.id} user={user} userRentals={userRentals} />
                            ))
                        }
                    </TableBody>
                </Table>
            }
            {
                list === 'transactionHistoryList' &&
                <Table className={'mx-auto border'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Game Title</TableHead>
                            <TableHead>Rent Type</TableHead>
                            <TableHead>Account Plan</TableHead>
                            <TableHead>Rent Payment</TableHead>
                            <TableHead>Rent Deposit</TableHead>
                            <TableHead colSpan={2}>Transaction Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            userTransactions.map((userTransaction: UserTransaction) => (
                                <UserTransactionTableRow key={userTransaction.id} userTransaction={userTransaction} />
                            ))
                        }
                    </TableBody>
                </Table>
            }
        </>
    )
}