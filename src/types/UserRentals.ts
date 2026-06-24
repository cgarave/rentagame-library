import { GameDetails } from "@/types/GameDetails";
import { User } from "@/types/User"
export interface UserRentals {
    id?: string;
    game: GameDetails;
    user: User;
    rentType: 'WEEKLY' | 'MONTHLY';
    status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
    accountPlan: 'TROPHY' | 'NONTROPHY';
    rentedAt: Date;
    expiresAt: Date;
    createdAt: Date;
}