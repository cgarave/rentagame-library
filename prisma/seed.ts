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
        availableTrophy: 1,
        availableNonTrophy: 1,
        renters: 0,
        slot: 2
    },
    {
        gameImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/97e9f5fa6e50c185d249956c6f198a2652a9217e69a59ecd.jpg?',
        gameTitle: 'Spider-Man 2',
        weeklyPrice: 149,
        monthlyPrice: 499,
        availableTrophy: 2,
        availableNonTrophy: 2,
        renters: 0,
        slot: 4
    },
    {
        gameImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202312/0117/315718bce7eed62e3cf3fb02d61b81ff1782d6b6cf850fa4.png',
        gameTitle: 'The Last of Us 2',
        weeklyPrice: 149,
        monthlyPrice: 499,
        availableTrophy: 1,
        availableNonTrophy: 1,
        renters: 0,
        slot: 2
    },
    {
        gameImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202507/0215/f98041a10ccc22d45fc2f6eded09eec50abd106d01547a5d.png',
        gameTitle: '007: First Light',
        weeklyPrice: 149,
        monthlyPrice: 499,
        availableTrophy: 1,
        availableNonTrophy: 1,
        renters: 0,
        slot: 2
    },
    {
        gameImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202509/2318/78549217df5077bea107700e077d04be6a9a4b0dfbcd821a.png',
        gameTitle: 'Saros',
        weeklyPrice: 149,
        monthlyPrice: 499,
        availableTrophy: 1,
        availableNonTrophy: 1,
        renters: 0,
        slot: 2
    }
]

const userData: Prisma.UserCreateInput[] = [
    {
        name: 'Rave',
        email: 'raevflores@gmail.com',
        isAdmin: true,
        emailVerified: true,
        image: null,
    },
]

export async function main() {
    for (const u of gameData) {
        await prisma.game.create({ data: u });
    }
    // for (const u of userData) {
    //     await prisma.user.create({ data: u });
    // }
}
main();