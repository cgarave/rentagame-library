'use client'

import { Plus } from "lucide-react"
import Header from '@/components/Header'
import AddGameModal from "@/components/AddGameModal";
import { DropdownMenuComponent } from "@/components/DropdownMenu";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GameDetails } from "@/types/GameDetails";
import { useEffect, useState } from "react";

export default function DashboardPage() {

    const [games, setGames] = useState([])
    useEffect(() => {
        async function fetchGames() {
            const response = await fetch('/api/games')
            const games = await response.json()
            setGames(games)
        }
        fetchGames()
    }, []);

    return (
        <>
            <Header />
            <main className={'flex flex-col gap-y-6 py-30 px-40 h-screen'}>
                <h1 className={'font-bold text-4xl'}>Dashboard</h1>
                <div className={'flex flex-row justify-end'}>
                    <AddGameModal
                        gameListTitle={games}
                        buttonVariant={'default'}
                        buttonIcon={<Plus/>}
                        buttonName={'Add Game'}
                        modalDetails={{
                            modalTitle: 'Add New Game',
                            modalDescription: 'Added game will be added to the list',
                            closeButtonName: 'Cancel',
                            submitButtonName: 'Add Game',
                        }}
                        onSubmitButton={'addGameFunction'}
                    />
                </div>
                <Table className={'mx-auto border'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Game Id</TableHead>
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
                                    <TableCell>{game.id}</TableCell>
                                    <TableCell className={'font-semibold'}>{game.gameTitle}</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>{game.slot}</TableCell>
                                    <TableCell>{game.weeklyPrice}</TableCell>
                                    <TableCell>{game.monthlyPrice}</TableCell>
                                    <TableCell>{game.availableTrophy}</TableCell>
                                    <TableCell>{game.availableNonTrophy}</TableCell>
                                    <TableCell>
                                        <DropdownMenuComponent/>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </main>
        </>
    )
}