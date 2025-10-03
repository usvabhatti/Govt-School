/*
  Warnings:

  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnic]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnic]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnic` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnic` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Made the column `passwordHash` on table `Teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."Admin_email_key";

-- DropIndex
DROP INDEX "public"."Student_email_key";

-- DropIndex
DROP INDEX "public"."Teacher_email_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "email",
ADD COLUMN     "cnic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "email",
ADD COLUMN     "cnic" TEXT NOT NULL,
ALTER COLUMN "passwordHash" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_cnic_key" ON "Admin"("cnic");

-- CreateIndex
CREATE INDEX "Admin_cnic_idx" ON "Admin"("cnic");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_cnic_key" ON "Teacher"("cnic");

-- CreateIndex
CREATE INDEX "Teacher_cnic_idx" ON "Teacher"("cnic");
