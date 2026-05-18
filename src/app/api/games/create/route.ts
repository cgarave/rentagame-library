import {NextRequest, NextResponse} from 'next/server'
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client"

interface GameDetails {
    gameImage: string,
    gameTitle: string,
    weeklyPrice: number,
    monthlyPrice: number,
    availableTrophy: number,
    availableNonTrophy: number,
    slot: number
}

export async function POST(request: NextRequest, res: NextResponse) {
    const body = (await request.json()) as GameDetails;
    // const body = await request.json() as Prisma.GameCreateInput // another approach Prisma typing
    try {
        const game = await prisma.game.create({
            data: {
                gameImage: body.gameImage,
                gameTitle: body.gameTitle,
                weeklyPrice: body.weeklyPrice,
                monthlyPrice: body.monthlyPrice,
                availableTrophy: body.availableTrophy,
                availableNonTrophy: body.availableNonTrophy,
                slot: body.slot
            }
        })
        return NextResponse.json(game)
    } catch (err) {
        console.error(err);
        return
    }
}