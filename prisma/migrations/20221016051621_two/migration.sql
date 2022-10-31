/*
  Warnings:

  - You are about to drop the column `postId` on the `Author` table. All the data in the column will be lost.
  - Added the required column `photo` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_postId_fkey";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "postId",
ADD COLUMN     "photo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
