/*
  Warnings:

  - You are about to drop the column `games` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "games",
ADD COLUMN     "active_rent" TEXT[],
ADD COLUMN     "rent_history" TEXT[];
