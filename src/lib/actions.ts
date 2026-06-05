'use server'

import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma"
import { refresh, revalidatePath } from 'next/cache'

export async function getGames() {
    return prisma.game.findMany()
}

export async function createGame(data: Prisma.GameCreateInput) {
    await prisma.game.create({ data })
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
}