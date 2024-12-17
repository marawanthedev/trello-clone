/*
  Warnings:

  - The values [PROCCESSING,FAILED,SUCCESS] on the enum `CardStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CardStatus_new" AS ENUM ('PENDING', 'INPROGRESS', 'DONE');
ALTER TABLE "Card" ALTER COLUMN "status" TYPE "CardStatus_new" USING ("status"::text::"CardStatus_new");
ALTER TYPE "CardStatus" RENAME TO "CardStatus_old";
ALTER TYPE "CardStatus_new" RENAME TO "CardStatus";
DROP TYPE "CardStatus_old";
COMMIT;
