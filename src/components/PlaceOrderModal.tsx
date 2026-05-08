import Button from './Button'
type Props = {
    modalOpen: boolean,
    rentalDetails: {
        gameTitle: string,
        weeklyPlanPrice: number,
        monthlyPlanPrice: number,
        trophyAvailability: boolean,
        nonTrophyAvailability: boolean,
    }
}
export default function PlaceOrderModal({ modalOpen, rentalDetails }: Props) {

    return (
        <div className={modalOpen ? 'absolute w-96 h-96 bg-gray-100 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-900' : 'absolute w-96 h-96 bg-gray-100 rounded-lg hidden'}>
            <h1>{rentalDetails.gameTitle}</h1>
            <p>{rentalDetails.weeklyPlanPrice}</p>
            <p>{rentalDetails.monthlyPlanPrice}</p>
            <p>{rentalDetails.trophyAvailability}</p>
            <p>{rentalDetails.nonTrophyAvailability}</p>
        </div>
    )
}