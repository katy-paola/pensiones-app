-- CreateEnum
CREATE TYPE "Role" AS ENUM ('HOMEOWNER', 'STUDENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "rol" "Role" NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "HomeOwner" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "HomeOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pension" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT[],
    "price" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "amenities" TEXT NOT NULL,
    "services" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "homeOwnerId" TEXT,

    CONSTRAINT "Pension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "pensionId" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PensionToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeOwner_userId_key" ON "HomeOwner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_PensionToStudent_AB_unique" ON "_PensionToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_PensionToStudent_B_index" ON "_PensionToStudent"("B");

-- AddForeignKey
ALTER TABLE "HomeOwner" ADD CONSTRAINT "HomeOwner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pension" ADD CONSTRAINT "Pension_homeOwnerId_fkey" FOREIGN KEY ("homeOwnerId") REFERENCES "HomeOwner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_pensionId_fkey" FOREIGN KEY ("pensionId") REFERENCES "Pension"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PensionToStudent" ADD CONSTRAINT "_PensionToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Pension"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PensionToStudent" ADD CONSTRAINT "_PensionToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
