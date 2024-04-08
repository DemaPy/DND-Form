/*
  Warnings:

  - You are about to drop the column `descriuption` on the `Form` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "descriuption",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Form_userId_key" ON "Form"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Form_name_key" ON "Form"("name");
