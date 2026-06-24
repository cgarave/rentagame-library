export interface GameDetails {
    id?: string;
    gameImage: string;
    gameTitle: string;
    weeklyPrice?: number;
    monthlyPrice?: number;
    availableTrophy?: number;
    availableNonTrophy?: number;
    renters?: number;
    slot?: number;
    includeButton?: boolean;
    includeBadge?: boolean;
    expiresAt?: string;
    isGameReleased?: boolean;
}