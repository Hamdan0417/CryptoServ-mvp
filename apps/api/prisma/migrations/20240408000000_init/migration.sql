-- Enable UUID generation for deterministic ids
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "Persona" AS ENUM ('TALENT', 'EMPLOYER', 'INVESTOR');
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'OPS', 'COMPLIANCE', 'SUPPORT', 'GROWTH');
CREATE TYPE "ApplicationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'REVIEWING', 'ACCEPTED', 'REJECTED');
CREATE TYPE "EngagementStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED');
CREATE TYPE "MilestoneStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'RELEASED', 'DISPUTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "walletAddress" TEXT NOT NULL UNIQUE,
    "email" TEXT UNIQUE,
    "nonce" TEXT,
    "persona" "Persona",
    "roles" "UserRole"[] DEFAULT ARRAY['USER']::"UserRole"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "token" TEXT NOT NULL UNIQUE,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL UNIQUE,
    "displayName" TEXT NOT NULL,
    "headline" TEXT,
    "bio" TEXT,
    "skills" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "links" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Company_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "compensation" TEXT,
    "location" TEXT,
    "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "companyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "coverLetter" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "idx_application_user_job" ON "JobApplication"("userId", "jobId");

-- CreateTable
CREATE TABLE "ServiceOffering" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "price" NUMERIC(18,2) NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ServiceOffering_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Engagement" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "requesterId" TEXT NOT NULL,
    "providerId" TEXT,
    "serviceId" TEXT NOT NULL,
    "status" "EngagementStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Engagement_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Engagement_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Engagement_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "ServiceOffering"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Milestone" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "engagementId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount" NUMERIC(18,2) NOT NULL,
    "status" "MilestoneStatus" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Milestone_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stake" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    "amount" NUMERIC(36,18) NOT NULL,
    "tier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Stake_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GovernanceVote" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "proposalId" TEXT NOT NULL,
    "support" BOOLEAN NOT NULL,
    "weight" NUMERIC(36,18) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GovernanceVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Indexes
CREATE INDEX "idx_job_status" ON "Job"("status");
CREATE INDEX "idx_job_title" ON "Job"("title");
CREATE INDEX "idx_stake_pool_user" ON "Stake"("poolId", "userId");

-- Seed bootstrap data
INSERT INTO "User" ("id", "walletAddress", "roles")
VALUES ('00000000-0000-0000-0000-000000000001', '0x0000000000000000000000000000000000000001', ARRAY['USER']::"UserRole"[])
ON CONFLICT ("walletAddress") DO NOTHING;

INSERT INTO "Company" ("id", "name", "description", "website", "ownerId")
VALUES ('00000000-0000-0000-0000-000000000010', 'SERV Labs', 'Boutique Web3 venture studio powering the Crypto Serv ecosystem.', 'https://crypto-serv.xyz', '00000000-0000-0000-0000-000000000001')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Job" ("id", "title", "description", "compensation", "location", "tags", "companyId")
VALUES (
  '00000000-0000-0000-0000-000000000100',
  'Senior Web3 Product Strategist',
  'Own the product roadmap for the Crypto Serv ecosystem, partnering with compliance, talent, and investor teams.',
  '120k-160k USDC + SERV',
  'Remote-first',
  ARRAY['product', 'web3', 'strategy'],
  '00000000-0000-0000-0000-000000000010'
) ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ServiceOffering" ("id", "title", "summary", "tier", "price", "createdById")
VALUES (
  '00000000-0000-0000-0000-000000001000',
  'Smart Contract Audit Sprint',
  'Four-week accelerated audit with escrow-backed remediation milestones.',
  'premium',
  45000.00,
  '00000000-0000-0000-0000-000000000001'
) ON CONFLICT ("id") DO NOTHING;
