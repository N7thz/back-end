/*
  Warnings:

  - You are about to drop the column `type` on the `images` table. All the data in the column will be lost.
  - Made the column `path` on table `images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fullPath` on table `images` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "type",
ALTER COLUMN "path" SET NOT NULL,
ALTER COLUMN "fullPath" SET NOT NULL;

-- DropEnum
DROP TYPE "ImageType";
