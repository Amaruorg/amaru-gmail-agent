/*
  Warnings:

  - You are about to drop the `action_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `action_summaries` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `actions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `actions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."action_events" DROP CONSTRAINT "action_events_actionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."action_summaries" DROP CONSTRAINT "action_summaries_actionId_fkey";

-- AlterTable
ALTER TABLE "public"."actions" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "processingTime" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userPrompt" TEXT,
ALTER COLUMN "modelVersion" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."emails" ALTER COLUMN "threadId" DROP NOT NULL,
ALTER COLUMN "to" DROP NOT NULL,
ALTER COLUMN "from" DROP NOT NULL,
ALTER COLUMN "subject" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."action_events";

-- DropTable
DROP TABLE "public"."action_summaries";

-- CreateTable
CREATE TABLE "public"."summary_actions" (
    "actionId" TEXT NOT NULL,
    "summaryText" TEXT NOT NULL,

    CONSTRAINT "summary_actions_pkey" PRIMARY KEY ("actionId")
);

-- AddForeignKey
ALTER TABLE "public"."summary_actions" ADD CONSTRAINT "summary_actions_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "public"."actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
