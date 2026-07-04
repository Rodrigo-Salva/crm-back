import { Injectable } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { Readable } from 'stream';
const csv = require('csv-parser');

@Injectable()
export class ImportService {
  constructor(private readonly prisma: PrismaService) {}

  async importCompanies(buffer: Buffer, ownerId: string, tenantId: string) {
    const results: any[] = [];
    const errors: { row: number; message: string }[] = [];
    let rowIndex = 0;

    const stream = Readable.from(buffer.toString());
    const parser = stream.pipe(csv());

    for await (const row of parser) {
      rowIndex++;
      try {
        const company = await this.prisma.company.create({
          data: {
            name: row.name || row.Name || row.nombre || row.Nombre || '',
            industry: row.industry || row.Industry || row.industria || '',
            website: row.website || row.Website || row.sitio || '',
            phone: row.phone || row.Phone || row.telefono || '',
            address: row.address || row.Address || row.direccion || '',
            ownerId,
            tenantId,
          },
        });
        results.push(company);
      } catch (err: any) {
        errors.push({ row: rowIndex, message: err.message });
      }
    }

    return { imported: results.length, errors, total: rowIndex };
  }

  async importLeads(buffer: Buffer, ownerId: string, tenantId: string) {
    const results: any[] = [];
    const errors: { row: number; message: string }[] = [];
    let rowIndex = 0;

    const stream = Readable.from(buffer.toString());
    const parser = stream.pipe(csv());

    for await (const row of parser) {
      rowIndex++;
      try {
        const lead = await this.prisma.lead.create({
          data: {
            name: row.title || row.Title || row.name || row.Name || row.nombre || row.Nombre || '',
            email: row.email || row.Email || undefined,
            phone: row.phone || row.Phone || row.telefono || undefined,
            companyName: row.company || row.Company || row.empresa || undefined,
            position: row.position || row.Position || row.cargo || undefined,
            value: parseFloat(row.value || row.Value || '0') || 0,
            status: row.stage || row.Stage || row.status || row.Status || 'new',
            ownerId,
            tenantId,
          },
        });
        results.push(lead);
      } catch (err: any) {
        errors.push({ row: rowIndex, message: err.message });
      }
    }

    return { imported: results.length, errors, total: rowIndex };
  }

  async importProducts(buffer: Buffer, _ownerId: string, tenantId: string) {
    const results: any[] = [];
    const errors: { row: number; message: string }[] = [];
    let rowIndex = 0;

    const stream = Readable.from(buffer.toString());
    const parser = stream.pipe(csv());

    for await (const row of parser) {
      rowIndex++;
      try {
        const product = await this.prisma.product.create({
          data: {
            name: row.name || row.Name || row.nombre || '',
            price: parseFloat(row.price || row.Price || row.precio || '0') || 0,
            description: row.description || row.Description || row.descripcion || '',
            category: row.category || row.Category || row.categoria || '',
            sku: row.sku || row.Sku || row.SKU || '',
            tenantId,
          },
        });
        results.push(product);
      } catch (err: any) {
        errors.push({ row: rowIndex, message: err.message });
      }
    }

    return { imported: results.length, errors, total: rowIndex };
  }
}
