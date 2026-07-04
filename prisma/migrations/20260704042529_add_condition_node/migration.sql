-- AlterEnum
ALTER TYPE "AutomationNodeType" ADD VALUE 'condition';

-- AlterTable
ALTER TABLE "automation_connections" ADD COLUMN     "source_handle" TEXT;

