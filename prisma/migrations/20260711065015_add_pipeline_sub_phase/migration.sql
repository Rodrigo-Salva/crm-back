-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "sub_phase_id" TEXT;

-- CreateTable
CREATE TABLE "pipeline_sub_phases" (
    "id" TEXT NOT NULL,
    "pipeline_stage_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "tenant_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pipeline_sub_phases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pipeline_sub_phases_pipeline_stage_id_name_key" ON "pipeline_sub_phases"("pipeline_stage_id", "name");

-- AddForeignKey
ALTER TABLE "pipeline_sub_phases" ADD CONSTRAINT "pipeline_sub_phases_pipeline_stage_id_fkey" FOREIGN KEY ("pipeline_stage_id") REFERENCES "pipeline_stages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pipeline_sub_phases" ADD CONSTRAINT "pipeline_sub_phases_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_sub_phase_id_fkey" FOREIGN KEY ("sub_phase_id") REFERENCES "pipeline_sub_phases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

