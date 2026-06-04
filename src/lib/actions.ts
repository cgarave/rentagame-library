'use server'

import {NextRequest, NextResponse} from 'next/server'
import prisma from "@/lib/prisma";
import { GameDetails } from "@/types/GameDetails";

export async function createGame(data: GameDetails): Promise<GameDetails> {
    try {
        return await prisma.game.create({ data })
    } catch (error) {
        console.error('Create game failed:', error)
        throw new Error('Failed to create game')
    }
}

export async function updateGame(data: GameDetails): Promise<GameDetails> {
    try {
        return await prisma.game.update({
            where: {
                id: data.id
            },
            data: data
        })
    } catch (error) {
        console.error('Update game details failed:',error);
        throw new Error('Failed to update game details')
    }
}

export async function deleteGame(id: number | undefined) {
    try {
        return await prisma.game.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        console.error('Delete game failed:',error);
        throw new Error('Failed to delete game')
    }
}

