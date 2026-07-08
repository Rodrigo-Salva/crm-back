-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "lead_id" TEXT;

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "escalated_at" TIMESTAMP(3),
ADD COLUMN     "first_responded_at" TIMESTAMP(3),
ADD COLUMN     "first_response_deadline" TIMESTAMP(3),
ADD COLUMN     "sla_breach_notified_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

