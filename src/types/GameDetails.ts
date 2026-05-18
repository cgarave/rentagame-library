export interface GameDetails {
    id?: number,
    gameImage: string,
    gameTitle: string,
    weeklyPrice: number,
    monthlyPrice: number,
    availableTrophy: number,
    availableNonTrophy: number,
    slot: number
}