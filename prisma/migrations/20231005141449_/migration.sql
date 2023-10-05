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
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "generation" INTEGER,
    "evolutionStage" TEXT,
    "evolved" INTEGER NOT NULL,
    "familyId" INTEGER,
    "crossGen" INTEGER NOT NULL,
    "type1" TEXT,
    "type2" TEXT,
    "weather1" TEXT,
    "weather2" TEXT,
    "statTotal" INTEGER,
    "atk" INTEGER NOT NULL,
    "def" INTEGER NOT NULL,
    "sta" INTEGER NOT NULL,
    "legendary" INTEGER NOT NULL,
    "aquireable" INTEGER NOT NULL,
    "spawns" INTEGER NOT NULL,
    "regional" INTEGER NOT NULL,
    "raidable" INTEGER NOT NULL,
    "hatchable" INTEGER NOT NULL,
    "shiny" INTEGER NOT NULL,
    "nest" INTEGER NOT NULL,
    "new" INTEGER NOT NULL,
    "notGettable" INTEGER NOT NULL,
    "futureEvolve" INTEGER NOT NULL,
    "cp40" INTEGER NOT NULL,
    "cp39" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
