-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_subscription_id_fkey";

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "ruc" TEXT;

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "cdr_url" TEXT,
ADD COLUMN     "correlative" INTEGER,
ADD COLUMN     "doc_type" TEXT NOT NULL DEFAULT 'factura',
ADD COLUMN     "fiscal_status" TEXT NOT NULL DEFAULT 'not_configured',
ADD COLUMN     "pdf_url" TEXT,
ADD COLUMN     "quote_id" TEXT,
ADD COLUMN     "series" TEXT,
ADD COLUMN     "sunat_response" TEXT,
ADD COLUMN     "xml_url" TEXT,
ALTER COLUMN "subscription_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "nubefact_configs" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "serie_factura" TEXT NOT NULL DEFAULT 'F001',
    "serie_boleta" TEXT NOT NULL DEFAULT 'B001',
    "sandbox" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "nubefact_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nubefact_configs_tenant_id_key" ON "nubefact_configs"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_quote_id_key" ON "invoices"("quote_id");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nubefact_configs" ADD CONSTRAINT "nubefact_configs_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

