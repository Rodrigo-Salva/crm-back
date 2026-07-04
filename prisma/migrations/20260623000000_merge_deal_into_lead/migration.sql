-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_deal_id_fkey";

-- DropForeignKey
ALTER TABLE "deals" DROP CONSTRAINT "deals_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "deals" DROP CONSTRAINT "deals_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "deals" DROP CONSTRAINT "deals_team_id_fkey";

-- DropForeignKey
ALTER TABLE "deals" DROP CONSTRAINT "deals_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_deal_id_fkey";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "deal_id",
ADD COLUMN     "lead_id" TEXT;

-- AlterTable
ALTER TABLE "leads" DROP COLUMN "converted_contact_id",
DROP COLUMN "converted_deal_id",
ADD COLUMN     "contact_id" TEXT,
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'MXN',
ADD COLUMN     "custom_fields" JSONB,
ADD COLUMN     "expected_close_date" TIMESTAMP(3),
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "pipeline_stages" ADD COLUMN     "is_lost" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_won" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "quotes" DROP COLUMN "deal_id",
ADD COLUMN     "lead_id" TEXT;

-- DataMigration: carry every existing Deal over into a new Lead before the deals table is dropped
INSERT INTO "leads" (
  id, name, email, phone, company, source, status, score, notes,
  value, currency, expected_close_date, custom_fields, contact_id,
  owner_id, tenant_id, team_id, created_at, updated_at
)
SELECT
  gen_random_uuid(), title, NULL, NULL, NULL, 'web', stage, 0, NULL,
  value, currency, expected_close_date, custom_fields, contact_id,
  owner_id, tenant_id, team_id, created_at, updated_at
FROM "deals";

-- DropTable
DROP TABLE "deals";

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
