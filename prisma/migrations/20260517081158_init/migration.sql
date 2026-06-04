-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "gameImage" TEXT NOT NULL,
    "gameTitle" TEXT NOT NULL,
    "weeklyPrice" INTEGER NOT NULL,
    "monthlyPrice" INTEGER NOT NULL,
    "availableTrophy" INTEGER NOT NULL,
    "availableNonTrophy" INTEGER NOT NULL,
    "slot" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
