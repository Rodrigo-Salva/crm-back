-- CreateEnum
CREATE TYPE "AutomationNodeType" AS ENUM ('trigger', 'action', 'wait');

-- DropForeignKey
ALTER TABLE "automation_rules" DROP CONSTRAINT "automation_rules_tenant_id_fkey";

-- DropTable
DROP TABLE "automation_rules";

-- CreateTable
CREATE TABLE "automations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "tenant_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "automations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automation_nodes" (
    "id" TEXT NOT NULL,
    "automation_id" TEXT NOT NULL,
    "type" "AutomationNodeType" NOT NULL,
    "action_type" TEXT,
    "config" JSONB,
    "position_x" DOUBLE PRECISION NOT NULL,
    "position_y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "automation_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automation_connections" (
    "id" TEXT NOT NULL,
    "automation_id" TEXT NOT NULL,
    "source_node_id" TEXT NOT NULL,
    "target_node_id" TEXT NOT NULL,

    CONSTRAINT "automation_connections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "automations" ADD CONSTRAINT "automations_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automation_nodes" ADD CONSTRAINT "automation_nodes_automation_id_fkey" FOREIGN KEY ("automation_id") REFERENCES "automations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automation_connections" ADD CONSTRAINT "automation_connections_automation_id_fkey" FOREIGN KEY ("automation_id") REFERENCES "automations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automation_connections" ADD CONSTRAINT "automation_connections_source_node_id_fkey" FOREIGN KEY ("source_node_id") REFERENCES "automation_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automation_connections" ADD CONSTRAINT "automation_connections_target_node_id_fkey" FOREIGN KEY ("target_node_id") REFERENCES "automation_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

