-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "generation" TEXT NOT NULL,
    "evolutionStage" TEXT NOT NULL,
    "evolved" BOOLEAN NOT NULL,
    "familyId" INTEGER NOT NULL,
    "crossGen" BOOLEAN NOT NULL,
    "type1" TEXT NOT NULL,
    "type2" TEXT NOT NULL,
    "weather1" TEXT NOT NULL,
    "weather2" TEXT NOT NULL,
    "statTotal" INTEGER NOT NULL,
    "atk" INTEGER NOT NULL,
    "def" INTEGER NOT NULL,
    "sta" INTEGER NOT NULL,
    "legendary" BOOLEAN NOT NULL,
    "aquireable" BOOLEAN NOT NULL,
    "spawns" BOOLEAN NOT NULL,
    "regional" BOOLEAN NOT NULL,
    "raidable" INTEGER NOT NULL,
    "hatchable" INTEGER NOT NULL,
    "shiny" BOOLEAN NOT NULL,
    "nest" BOOLEAN NOT NULL,
    "new" BOOLEAN NOT NULL,
    "notGettable" BOOLEAN NOT NULL,
    "futureEvolve" BOOLEAN NOT NULL,
    "cp40" INTEGER NOT NULL,
    "cp39" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
