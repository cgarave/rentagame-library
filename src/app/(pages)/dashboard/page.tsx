import { Plus } from "lucide-react"
import Header from '@/components/Header'
import AddGameModal from "@/components/AddGameModal";
import { DropdownMenuComponent } from "@/components/DropdownMenu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GameDetails } from "@/types/GameDetails";
import { getGames } from "@/lib/actions";

export default async function DashboardPage() {

    const games = await getGames()

    return (
        <>
            <Header />
            <main className={'flex flex-col gap-y-6 py-30 px-40 h-screen'}>
                <h1 className={'font-bold text-4xl'}>Dashboard</h1>
                <div className={'flex flex-row justify-end'}>
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
                                        <DropdownMenuComponent game={game} />
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