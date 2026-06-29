'use server'

import { Prisma, RentType, AccountPlan } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma"
import { revalidatePath } from 'next/cache'

interface TransactionData {
    userId: string;
    gameId: string;
    rentType: RentType;
    accountPlan : AccountPlan;
    rentPayment: number;
    rentDeposit: number;
    isConfirmed: boolean;
}

export async function getUserTransactions() {
    return prisma.newRentTransaction.findMany({
        include: {
            user: true,
            game: true
        }
    })
}

export async function createRentTransaction(input: TransactionData) {
    const { userId, gameId, rentType, accountPlan, rentPayment, rentDeposit, isConfirmed } = input;
    await prisma.newRentTransaction.create({
        data: {
            userId,
            gameId,
            rentType,
            accountPlan,
            rentPayment,
            rentDeposit,
            isConfirmed
        }
    })
    revalidatePath('/dashboard');
}