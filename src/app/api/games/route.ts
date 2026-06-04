import {NextRequest, NextResponse} from 'next/server'
import prisma from "@/lib/prisma";
import { GameDetails } from "@/types/GameDetails";
import { Prisma } from "@prisma/client"

export async function GET() {
    const games = await prisma.game.findMany();
    return NextResponse.json(games)
}

export async function POST(request: NextRequest) {
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

export async function PUT(request: NextRequest) {
    const body = (await request.json()) as GameDetails;
    try {
        const updatedGame = await prisma.game.update(
            {
                where: {
                    id: body.id
                },
                data: {
                    gameImage: body.gameImage,
                    gameTitle: body.gameTitle,
                    weeklyPrice: body.weeklyPrice,
                    monthlyPrice: body.monthlyPrice,
                    availableTrophy: body.availableTrophy,
                    availableNonTrophy: body.availableNonTrophy,
                    slot: body.slot
                }
            }
        )
        return NextResponse.json(updatedGame)
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { error: "Failed to update game" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    const body = (await request.json()) as GameDetails;
    try {
        const deleteGame = await prisma.game.delete(
            {
                where: {
                    id: body.id
                }
            }
        )
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { error: "Failed to delete game" },
            { status: 500 }
        );
    }
}