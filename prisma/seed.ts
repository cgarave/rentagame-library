import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
    adapter,
});

const gameData: Prisma.GameCreateInput[] = [
    {
        gameImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202501/2217/e5833a53529ff9879e87689f1e8b04d45ba7e6c97fa791e2.png',
        gameTitle: 'Clair Obscur: Expedition 33',
        weeklyPrice: 149,
        monthlyPrice: 499,
        availableTrophy: 10,
        availableNonTrophy: 10,
        slot: 20
    },
    {
        gameImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/97e9f5fa6e50c185d249956c6f198a2652a9217e69a59ecd.jpg?',
        gameTitle: 'Spider-Man 2',
        weeklyPrice: 99,
        monthlyPrice: 299,
        availableTrophy: 5,
        availableNonTrophy: 5,
        slot: 10
    }
]

export async function main() {
    for (const u of gameData) {
        await prisma.game.create({ data: u });
    }
}
main();