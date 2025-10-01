/*
  Warnings:

  - A unique constraint covering the columns `[cnic]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnic` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Made the column `passwordHash` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "cnic" TEXT NOT NULL,
ALTER COLUMN "passwordHash" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_cnic_key" ON "Student"("cnic");

-- CreateIndex
CREATE INDEX "Student_cnic_idx" ON "Student"("cnic");
