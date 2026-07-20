-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "referred_by_lead_id" TEXT;

-- CreateTable
CREATE TABLE "referral_rewards" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "referrer_lead_id" TEXT NOT NULL,
    "referred_lead_id" TEXT NOT NULL,
    "quote_id" TEXT NOT NULL,
    "base_amount" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paid_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referral_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "referral_rewards_quote_id_key" ON "referral_rewards"("quote_id");

-- AddForeignKey
ALTER TABLE "referral_rewards" ADD CONSTRAINT "referral_rewards_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_rewards" ADD CONSTRAINT "referral_rewards_referrer_lead_id_fkey" FOREIGN KEY ("referrer_lead_id") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_rewards" ADD CONSTRAINT "referral_rewards_referred_lead_id_fkey" FOREIGN KEY ("referred_lead_id") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_rewards" ADD CONSTRAINT "referral_rewards_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_referred_by_lead_id_fkey" FOREIGN KEY ("referred_by_lead_id") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

