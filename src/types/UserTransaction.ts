import { GameDetails } from "@/types/GameDetails";
import { User } from "@/types/User"

export interface UserTransaction {
    id?: string;
    user: User;
    game: GameDetails;
    rentType: 'WEEKLY' | 'MONTHLY';
    accountPlan: 'TROPHY' | 'NONTROPHY';
    rentPayment: number;
    rentDeposit: number;
    isConfirmed: boolean;
    createdAt: Date;
}