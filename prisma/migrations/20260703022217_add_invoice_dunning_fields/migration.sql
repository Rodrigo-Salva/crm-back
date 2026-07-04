-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "last_reminder_at" TIMESTAMP(3),
ADD COLUMN     "reminders_sent" INTEGER NOT NULL DEFAULT 0;

