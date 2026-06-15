'use server'

import { Prisma, RentStatus, RentType, AccountPlan } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma"
import { revalidatePath } from 'next/cache'

// Dashboard CRUD actions
export async function getGames() {
    return prisma.game.findMany({
        orderBy: {
            gameTitle: 'desc'
        },
    })
}

export async function createGame(data: Prisma.GameCreateInput) {
    await prisma.game.create({ data })
    revalidatePath('/');
    revalidatePath('/dashboard');
}

export async function updateGame(id: string, data: Prisma.GameUpdateInput) {
    await prisma.game.update({
        where: { id: id },
        data
    })

    revalidatePath('/');
    revalidatePath('/dashboard');
}

export async function deleteGame(id: string) {
    await prisma.game.delete({
        where: { id: id },
    })

    revalidatePath('/');
    revalidatePath('/dashboard');
}

// Rentals
function getExpiryDate(rentType: RentType) {
    const date = new Date()

    switch (rentType) {
        case "WEEKLY":
            date.setDate(date.getDate() + 7)
            break
        case "MONTHLY":
            date.setMonth(date.getMonth() + 1)
            break
    }

    return date
}
interface rentalData {
    userId: string;
    gameId: string;
    status: RentStatus;
    rentType: RentType;
    accountPlan : AccountPlan;
}
export async function createRental(input: rentalData) {
    const { userId, gameId, status, rentType, accountPlan } = input;
    await prisma.rental.create({
        data: {
            userId,
            gameId,
            status,
            rentType,
            accountPlan,
            expiresAt: getExpiryDate(rentType),
        }
    })
    revalidatePath('/');
}

export async function findRental(id: string) {
    return prisma.game.findMany({
        where: {
            rentals: {
                some: {
                    userId: id,
                },
            },
        },
    })
}