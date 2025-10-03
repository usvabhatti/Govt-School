-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "cnic",
ADD COLUMN "username" TEXT NOT NULL,
ADD COLUMN "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");