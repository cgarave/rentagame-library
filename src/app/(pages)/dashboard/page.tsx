import { Plus } from "lucide-react"
import Header from '@/components/Header'
import AddGameModal from "@/components/AddGameModal";
import { DropdownMenuComponent } from "@/components/DropdownMenu";
import { mockData } from '@/app/mock.data'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type AddedGameDetailsProps = {
    gameImage: string,
    gameTitle: string,
    weeklyPrice: number,
    monthlyPrice: number,
    trophy: boolean,
    nonTrophy: boolean,
    availableTrophy: number,
    availableNonTrophy: number,
    renters: number,
    availableSlot: number,
}
export default function DashboardPage() {

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
                            mockData.map((game) => (
                                <TableRow key={game.id}>
                                    <TableCell className={'font-semibold'}>{game.gameTitle}</TableCell>
                                    <TableCell>{game.renters}</TableCell>
                                    <TableCell>{game.availableSlot}</TableCell>
                                    <TableCell>{game.weeklyPrice}</TableCell>
                                    <TableCell>{game.monthlyPrice}</TableCell>
                                    <TableCell>{game.availableTrophy}</TableCell>
                                    <TableCell>{game.availableNonTrophy}</TableCell>
                                    <TableCell><DropdownMenuComponent/></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </main>
        </>
    )
}