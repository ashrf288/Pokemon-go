-- AlterTable
ALTER TABLE "Pokemon" ALTER COLUMN "evolutionStage" DROP NOT NULL,
ALTER COLUMN "evolutionStage" SET DATA TYPE TEXT;
