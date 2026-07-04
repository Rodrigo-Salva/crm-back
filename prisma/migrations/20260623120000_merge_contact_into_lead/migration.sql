-- ============================================================
-- 0. Drop FKs/constraints that reference contacts, but KEEP the
--    contact_id columns on activities/quotes/campaign_recipients/
--    emails/tickets/leads for now — we need them to repoint data.
-- ============================================================
ALTER TABLE "activities" DROP CONSTRAINT "activities_contact_id_fkey";
ALTER TABLE "campaign_recipients" DROP CONSTRAINT "campaign_recipients_contact_id_fkey";
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_company_id_fkey";
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_owner_id_fkey";
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_team_id_fkey";
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_tenant_id_fkey";
ALTER TABLE "emails" DROP CONSTRAINT "emails_contact_id_fkey";
ALTER TABLE "leads" DROP CONSTRAINT "leads_contact_id_fkey";
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_contact_id_fkey";
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_contact_id_fkey";

-- ============================================================
-- 1. New columns on leads (keep contact_id for now)
-- ============================================================
ALTER TABLE "leads" ADD COLUMN     "company_id" TEXT,
ADD COLUMN     "company_name" TEXT,
ADD COLUMN     "customer_status" "ContactStatus",
ADD COLUMN     "portal_password" TEXT,
ADD COLUMN     "position" TEXT;

-- New lead_id columns on child tables that didn't have one yet (keep contact_id for now)
ALTER TABLE "emails" ADD COLUMN "lead_id" TEXT;
ALTER TABLE "campaign_recipients" ADD COLUMN "lead_id" TEXT;
ALTER TABLE "tickets" ADD COLUMN "lead_id" TEXT;

-- ============================================================
-- 2. Data migration A: leads that already link to a contact ->
--    merge the contact's fields into that same lead row.
-- ============================================================
UPDATE "leads" l
SET "company_id" = c."company_id",
    "company_name" = c."company_name",
    "position" = c."position",
    "customer_status" = c."status",
    "portal_password" = c."portal_password",
    "email" = COALESCE(l."email", c."email"),
    "phone" = COALESCE(l."phone", c."phone")
FROM "contacts" c
WHERE l."contact_id" = c.id;

-- ============================================================
-- 3. Data migration B: contacts with NO linked lead -> create a
--    new lead row per orphan contact (keep contact_id on the new
--    row temporarily so we can build the mapping table below).
-- ============================================================
INSERT INTO "leads" (
  "id", "contact_id", "name", "email", "phone", "company_name", "position",
  "customer_status", "portal_password", "company_id", "source", "status",
  "score", "value", "currency", "owner_id", "tenant_id", "team_id",
  "created_at", "updated_at"
)
SELECT
  gen_random_uuid(), c."id", c."name", c."email", c."phone", c."company_name", c."position",
  c."status", c."portal_password", c."company_id", 'web',
  COALESCE(
    (SELECT ps."name" FROM "pipeline_stages" ps
     WHERE ps."tenant_id" = c."tenant_id" AND c."status" = 'lost' AND ps."is_lost" = true
     ORDER BY ps."order" ASC LIMIT 1),
    (SELECT ps."name" FROM "pipeline_stages" ps
     WHERE ps."tenant_id" = c."tenant_id"
     ORDER BY ps."order" ASC LIMIT 1),
    'new'
  ),
  0, 0, 'MXN', c."owner_id", c."tenant_id", c."team_id", c."created_at", c."updated_at"
FROM "contacts" c
WHERE c."id" NOT IN (SELECT "contact_id" FROM "leads" WHERE "contact_id" IS NOT NULL);

-- ============================================================
-- 4. Build contact -> lead id mapping (covers both merge cases above)
-- ============================================================
CREATE TEMP TABLE "contact_lead_map" AS
SELECT "contact_id", "id" AS "lead_id" FROM "leads" WHERE "contact_id" IS NOT NULL;

-- ============================================================
-- 5. Repoint child FKs using the mapping
-- ============================================================
UPDATE "activities" a SET "lead_id" = m."lead_id"
FROM "contact_lead_map" m WHERE a."contact_id" = m."contact_id" AND a."lead_id" IS NULL;

UPDATE "quotes" q SET "lead_id" = m."lead_id"
FROM "contact_lead_map" m WHERE q."contact_id" = m."contact_id" AND q."lead_id" IS NULL;

UPDATE "tickets" t SET "lead_id" = m."lead_id"
FROM "contact_lead_map" m WHERE t."contact_id" = m."contact_id";

UPDATE "emails" e SET "lead_id" = m."lead_id"
FROM "contact_lead_map" m WHERE e."contact_id" = m."contact_id";

UPDATE "campaign_recipients" cr SET "lead_id" = m."lead_id"
FROM "contact_lead_map" m WHERE cr."contact_id" = m."contact_id";

-- ============================================================
-- 6. Remap generic relatedType/entity ('contact' -> 'lead') string
--    references so Notes/FileAttachments/AuditLogs don't orphan.
-- ============================================================
UPDATE "notes" n SET "related_type" = 'lead', "related_id" = m."lead_id"
FROM "contact_lead_map" m WHERE n."related_type" = 'contact' AND n."related_id" = m."contact_id";

UPDATE "file_attachments" f SET "entity" = 'lead', "entity_id" = m."lead_id"
FROM "contact_lead_map" m WHERE f."entity" = 'contact' AND f."entity_id" = m."contact_id";

UPDATE "audit_logs" al SET "entity" = 'lead', "entity_id" = m."lead_id"
FROM "contact_lead_map" m WHERE al."entity" = 'contact' AND al."entity_id" = m."contact_id";

-- ============================================================
-- 7. Drop old contact_id columns/constraints, enforce NOT NULL
--    where the original contactId was required.
-- ============================================================
ALTER TABLE "activities" DROP COLUMN "contact_id";
ALTER TABLE "quotes" DROP COLUMN "contact_id";
ALTER TABLE "tickets" DROP COLUMN "contact_id";
ALTER TABLE "emails" DROP COLUMN "contact_id";
ALTER TABLE "campaign_recipients" DROP COLUMN "contact_id";
ALTER TABLE "campaign_recipients" ALTER COLUMN "lead_id" SET NOT NULL;
ALTER TABLE "leads" DROP COLUMN "contact_id";

-- ============================================================
-- 8. Drop the contacts table entirely.
-- ============================================================
DROP TABLE "contacts";

-- ============================================================
-- 9. Add new foreign keys.
-- ============================================================
ALTER TABLE "emails" ADD CONSTRAINT "emails_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "campaign_recipients" ADD CONSTRAINT "campaign_recipients_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "leads" ADD CONSTRAINT "leads_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

DROP TABLE "contact_lead_map";
