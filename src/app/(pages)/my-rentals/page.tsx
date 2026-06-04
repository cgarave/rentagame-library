import Header from '@/components/Header';
import {GamesContainer} from "@/components/GamesContainer";
import GameCard from "@/components/GameCard";
export default function MyRentalsPage() {
    return (
        <>
            <Header />
            <main className={'flex flex-col gap-y-6 mt-30 px-3 xl:px-0 xl:w-[1280px] xl:mx-auto'}>
                <h1 className={'font-bold text-4xl'}>My Rentals</h1>
                <GamesContainer>

                </GamesContainer>
            </main>
        </>
    )
}