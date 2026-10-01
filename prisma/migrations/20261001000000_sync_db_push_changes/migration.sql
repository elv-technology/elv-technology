-- Catch-up migration for changes that were previously applied with `prisma db push`.
-- Written with IF NOT EXISTS so it is safe on databases that already have these objects.

-- pgvector + the KnowledgeBase embedding column (a db push run with the column commented out dropped it in production).
CREATE EXTENSION IF NOT EXISTS vector;
ALTER TABLE "KnowledgeBase" ADD COLUMN IF NOT EXISTS "embedding" vector(768);

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "priority" INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN IF NOT EXISTS "priority" INTEGER NOT NULL DEFAULT 100;

-- CreateTable
CREATE TABLE IF NOT EXISTS "Inquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'website',
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Application" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "message" TEXT,
    "resumeUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'applied',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
