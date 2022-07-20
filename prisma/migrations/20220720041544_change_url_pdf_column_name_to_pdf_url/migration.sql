/*
  Warnings:

  - You are about to drop the column `pdfUrl` on the `tests` table. All the data in the column will be lost.
  - Added the required column `pdf_url` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tests_name_key";

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "pdfUrl",
ADD COLUMN     "pdf_url" TEXT NOT NULL;
