-- AlterTable
ALTER TABLE "campaign_recipients" ADD COLUMN     "clicked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "clickedAt" TIMESTAMP(3),
ADD COLUMN     "tracking_id" TEXT;

-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "clickedCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "emails" ADD COLUMN     "clicked_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "campaign_recipients_tracking_id_key" ON "campaign_recipients"("tracking_id");

