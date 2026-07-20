-- CreateTable
CREATE TABLE "automation_assignment_cursors" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "pool_key" TEXT NOT NULL,
    "last_user_id" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "automation_assignment_cursors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "automation_assignment_cursors_tenant_id_pool_key_key" ON "automation_assignment_cursors"("tenant_id", "pool_key");

-- AddForeignKey
ALTER TABLE "automation_assignment_cursors" ADD CONSTRAINT "automation_assignment_cursors_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

