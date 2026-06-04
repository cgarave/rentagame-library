export interface GameDetails {
    id?: string,
    gameImage: string,
    gameTitle: string,
    weeklyPrice: number,
    monthlyPrice: number,
    availableTrophy: number,
    availableNonTrophy: number,
    slot: number
}