'use server'

import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma"

export async function getGames() {
    return prisma.game.findMany()
}

export async function createGame(data: Prisma.GameCreateInput) {
    return prisma.game.create({ data })
}

export async function updateGame(id: string, data: Prisma.GameUpdateInput) {
    return prisma.game.update({
        where: { id: id },
        data
    })
}

export async function deleteGame(id: string) {
    return prisma.game.delete({
        where: { id: id },
    })
}