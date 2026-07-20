-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "is_partner" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "google_calendar_event_id" TEXT;

-- CreateTable
CREATE TABLE "nps_responses" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "score" INTEGER,
    "comment" TEXT,
    "responded_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nps_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nps_responses_ticket_id_key" ON "nps_responses"("ticket_id");

-- CreateIndex
CREATE UNIQUE INDEX "nps_responses_token_key" ON "nps_responses"("token");

-- AddForeignKey
ALTER TABLE "nps_responses" ADD CONSTRAINT "nps_responses_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nps_responses" ADD CONSTRAINT "nps_responses_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

