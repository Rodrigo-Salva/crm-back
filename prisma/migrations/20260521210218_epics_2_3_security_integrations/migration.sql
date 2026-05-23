-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "google_calendar_event_id" TEXT;

-- AlterTable
ALTER TABLE "quotes" ADD COLUMN     "stripe_payment_intent_id" TEXT,
ADD COLUMN     "stripe_payment_url" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "google_refresh_token" TEXT,
ADD COLUMN     "is_two_factor_enabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sso_id" TEXT,
ADD COLUMN     "sso_provider" TEXT,
ADD COLUMN     "two_factor_secret" TEXT;
