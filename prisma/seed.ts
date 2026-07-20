import { PrismaClient, UserRole, TenantStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo' },
    update: {},
    create: {
      name: 'Demo Corp',
      slug: 'demo',
      status: TenantStatus.active,
    },
  });

  console.log('Tenant created:', tenant.slug);

  const password = await bcrypt.hash('Demo1234', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      password,
      name: 'Admin Demo',
      role: UserRole.superadmin,
      tenantId: tenant.id,
    },
  });

  console.log('Admin user created:', admin.email);

  const seller = await prisma.user.upsert({
    where: { email: 'seller@demo.com' },
    update: {},
    create: {
      email: 'seller@demo.com',
      password,
      name: 'Vendedor Demo',
      role: UserRole.seller,
      tenantId: tenant.id,
    },
  });

  console.log('Seller user created:', seller.email);

  const stages = [
    { name: 'Nuevo', order: 0 },
    { name: 'Contactado', order: 1 },
    { name: 'Reunión', order: 2 },
    { name: 'Negociación', order: 3 },
    { name: 'Cerrado Ganado', order: 4, isWon: true },
    { name: 'Cerrado Perdido', order: 5, isLost: true },
  ];

  for (const stage of stages) {
    await prisma.pipelineStage.upsert({
      where: { name_tenantId: { name: stage.name, tenantId: tenant.id } },
      update: {},
      create: { ...stage, tenantId: tenant.id },
    });
  }

  console.log('Pipeline stages created');

  const existingCompany = await prisma.company.findFirst({
    where: { name: 'Tech Solutions SA', tenantId: tenant.id },
  });

  const company = existingCompany || await prisma.company.create({
    data: {
      name: 'Tech Solutions SA',
      industry: 'Tecnología',
      ownerId: admin.id,
      tenantId: tenant.id,
    },
  });

  console.log('Company created:', company.name);

  const existingLead1 = await prisma.lead.findFirst({
    where: { email: 'juan@techsolutions.com', tenantId: tenant.id },
  });

  const lead1 = existingLead1 || await prisma.lead.create({
    data: {
      name: 'Juan Pérez',
      email: 'juan@techsolutions.com',
      phone: '+51999000002',
      status: 'Nuevo',
      tenantId: tenant.id,
      companyId: company.id,
      ownerId: admin.id,
    },
  });

  const existingLead2 = await prisma.lead.findFirst({
    where: { email: 'maria@techsolutions.com', tenantId: tenant.id },
  });

  const lead2 = existingLead2 || await prisma.lead.create({
    data: {
      name: 'María López',
      email: 'maria@techsolutions.com',
      phone: '+51999000003',
      status: 'Nuevo',
      tenantId: tenant.id,
      companyId: company.id,
      ownerId: admin.id,
    },
  });

  console.log('Leads created');

  const existingDeal = await prisma.lead.findFirst({
    where: { name: 'Implementación CRM', tenantId: tenant.id },
  });

    if (!existingDeal) {
      await prisma.lead.create({
        data: {
          name: 'Implementación CRM',
          value: 50000,
          status: 'Nuevo',
          tenantId: tenant.id,
          ownerId: admin.id,
        },
      });
      console.log('Lead created');
    }
    
    const softwareCategory = await prisma.productCategory.upsert({
      where: { name_tenantId: { name: 'Software', tenantId: tenant.id } },
      update: {},
      create: {
        name: 'Software',
        tenantId: tenant.id,
      },
    });

    const product1 = await prisma.product.upsert({
      where: { sku_tenantId: { sku: 'PROD-001', tenantId: tenant.id } },
      update: {},
      create: {
        name: 'CRM Basico',
        description: 'Licencia anual de CRM',
        price: 1500,
        currency: 'USD',
        categoryId: softwareCategory.id,
        sku: 'PROD-001',
        tenantId: tenant.id,
      },
    });

    const product2 = await prisma.product.upsert({
      where: { sku_tenantId: { sku: 'PROD-002', tenantId: tenant.id } },
      update: {},
      create: {
        name: 'CRM Pro',
        description: 'Licencia anual de CRM con IA',
        price: 3500,
        currency: 'USD',
        categoryId: softwareCategory.id,
        sku: 'PROD-002',
        tenantId: tenant.id,
      },
    });

  console.log('Products created');

  console.log('\n--- Seed completado ---');
  console.log('Admin: admin@demo.com / Demo1234');
  console.log('Seller: seller@demo.com / Demo1234');
  console.log('Tenant slug: demo');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
