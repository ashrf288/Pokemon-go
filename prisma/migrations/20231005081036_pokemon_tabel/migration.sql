/*
  Warnings:

  - The `generation` column on the `Pokemon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `evolutionStage` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `evolved` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `crossGen` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `legendary` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `aquireable` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `spawns` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `regional` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `shiny` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nest` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `new` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `notGettable` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `futureEvolve` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "generation",
ADD COLUMN     "generation" INTEGER,
DROP COLUMN "evolutionStage",
ADD COLUMN     "evolutionStage" INTEGER NOT NULL,
DROP COLUMN "evolved",
ADD COLUMN     "evolved" INTEGER NOT NULL,
ALTER COLUMN "familyId" DROP NOT NULL,
DROP COLUMN "crossGen",
ADD COLUMN     "crossGen" INTEGER NOT NULL,
ALTER COLUMN "type1" DROP NOT NULL,
ALTER COLUMN "type2" DROP NOT NULL,
ALTER COLUMN "weather1" DROP NOT NULL,
ALTER COLUMN "weather2" DROP NOT NULL,
ALTER COLUMN "statTotal" DROP NOT NULL,
DROP COLUMN "legendary",
ADD COLUMN     "legendary" INTEGER NOT NULL,
DROP COLUMN "aquireable",
ADD COLUMN     "aquireable" INTEGER NOT NULL,
DROP COLUMN "spawns",
ADD COLUMN     "spawns" INTEGER NOT NULL,
DROP COLUMN "regional",
ADD COLUMN     "regional" INTEGER NOT NULL,
DROP COLUMN "shiny",
ADD COLUMN     "shiny" INTEGER NOT NULL,
DROP COLUMN "nest",
ADD COLUMN     "nest" INTEGER NOT NULL,
DROP COLUMN "new",
ADD COLUMN     "new" INTEGER NOT NULL,
DROP COLUMN "notGettable",
ADD COLUMN     "notGettable" INTEGER NOT NULL,
DROP COLUMN "futureEvolve",
ADD COLUMN     "futureEvolve" INTEGER NOT NULL;
