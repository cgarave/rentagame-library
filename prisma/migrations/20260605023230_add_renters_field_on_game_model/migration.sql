-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "renters" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "Role";
