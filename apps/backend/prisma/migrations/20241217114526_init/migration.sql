-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('PENDING', 'PROCCESSING', 'FAILED', 'SUCCESS');

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "status" "CardStatus" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
